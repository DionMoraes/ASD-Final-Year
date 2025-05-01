import streamlit as st
import tensorflow as tf
import numpy as np
import cv2
from PIL import Image
import tempfile
import os

# Load Model
model = tf.keras.models.load_model("asd_cnn_model.h5")

# Sidebar Navigation
st.sidebar.title("🔍 Navigation")
page = st.sidebar.radio("Go to:", ["Upload Image", "Take Live Image", "Result", "Chatbot"])

# Upload Image Page
if page == "Upload Image":
    st.title("📤 Upload an Image")
    uploaded_file = st.file_uploader("Choose an image", type=["jpg", "png", "jpeg"])

    if uploaded_file:
        image = Image.open(uploaded_file).convert("RGB")
        image = image.resize((128, 128))
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        st.session_state["image"] = image
        st.session_state["img_array"] = img_array
        st.success("✅ Image uploaded and processed. Go to the Result page.")


# Take Live Photo
if page == "Take Live Image":
    st.title("📸 Take a Live Image")

    # Capture live image using OpenCV
    capture_button = st.button("Open Camera and Capture")

    if capture_button:
        cap = cv2.VideoCapture(0)

        if not cap.isOpened():
            st.error("❌ Cannot access camera.")
        else:
            st.info("📷 Press 'q' to capture an image.")
            
            while True:
                ret, frame = cap.read()
                if not ret:
                    st.error("⚠️ Failed to capture frame.")
                    break

                cv2.imshow("Live Camera - Press 'q' to capture", frame)
                if cv2.waitKey(1) & 0xFF == ord("q"):
                    img_path = tempfile.NamedTemporaryFile(delete=False, suffix='.jpg').name
                    cv2.imwrite(img_path, frame)
                    break

            #close OpenCV window
            cap.release()
            cv2.destroyAllWindows()

            # Process image
            image = Image.open(img_path).convert("RGB")
            image = image.resize((128, 128))
            img_array = np.array(image) / 255.0
            img_array = np.expand_dims(img_array, axis=0)

            st.session_state["image"] = image
            st.session_state["img_array"] = img_array

            st.success("✅ Image captured and processed. Go to the Result page.")
            st.image(image, caption="Captured Image", use_column_width=True)

# Result Page
elif page == "Result":
    st.title("🧠 ASD Detection Result")

    if "image" in st.session_state and "img_array" in st.session_state:
        st.image(st.session_state["image"], caption="Processed Image", use_column_width=True)

        prediction = model.predict(st.session_state["img_array"])[0][0]
        confidence = round(float(prediction) * 100, 2)
        result = "🟩 No ASD Detected" if prediction > 0.5 else "🟥 ASD Detected"

        st.subheader(f"🔎 Prediction: {result}")
        st.write(f"**Confidence Score:** {confidence}%")

        # Downloadable Report
        report = f"Prediction: {result}\nConfidence Score: {confidence}%"
        st.download_button(label="📥 Download Report", data=report, file_name="ASD_Report.txt")
    else:
        st.warning("⚠️ Please upload or capture an image first.")

# Chatbot Page
elif page == "Chatbot":
    st.title("💬 ASD Chatbot")
    user_input = st.text_input("Ask me anything about Autism Spectrum Disorder:")

    if user_input:
        response = "This is a placeholder response. The chatbot will answer your query soon!"
        st.write(f"🤖 **Bot:** {response}")
