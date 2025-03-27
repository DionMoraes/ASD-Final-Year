import streamlit as st
import tensorflow as tf
import numpy as np
import cv2
from PIL import Image

# Load Model
model = tf.keras.models.load_model("asd_cnn_model.h5")

# Sidebar Navigation
st.sidebar.title("🔍 Navigation")
page = st.sidebar.radio("Go to:", ["Home", "Upload Image", "Result", "Chatbot"])

# Home Page
if page == "Home":
    st.title("🏠 Welcome to the ASD Detection App")
    st.write("""
    This AI-powered app helps detect Autism Spectrum Disorder (ASD) from facial images.
    Upload an image and get instant results. This model is for research purposes only.
    """)
    st.image("home.png", use_container_width=True)  # Add a banner image

# Upload Image Page
elif page == "Upload Image":
    st.title("📤 Upload an Image")
    uploaded_file = st.file_uploader("Choose an image", type=["jpg", "png", "jpeg"])

    if uploaded_file:
        image = Image.open(uploaded_file).convert("RGB")
        image = image.resize((128, 128))
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        st.session_state["image"] = image  # Store image for result page
        st.session_state["img_array"] = img_array  # Store preprocessed image

# Result Page
elif page == "Result":
    st.title("🧠 ASD Detection Result")

    if "image" in st.session_state and "img_array" in st.session_state:
        # Display Uploaded Image
        st.image(st.session_state["image"], caption="Uploaded Image", use_column_width=True)

        # Model Prediction
        prediction = model.predict(st.session_state["img_array"])[0][0]
        confidence = round(float(prediction) * 100, 2)
        result = "🟩 No ASD Detected" if prediction > 0.5 else "🟥 ASD Detected"

        st.subheader(f"🔎 Prediction: {result}")
        st.write(f"**Confidence Score:** {1-confidence}%")

        # Downloadable Report
        report = f"Prediction: {result}\nConfidence Score: {confidence}%"
        st.download_button(label="📥 Download Report", data=report, file_name="ASD_Report.txt")
    else:
        st.warning("⚠️ Please upload an image first from the **Upload Image** page.")

# Chatbot Page
elif page == "Chatbot":
    st.title("💬 ASD Chatbot")
    user_input = st.text_input("Ask me anything about Autism Spectrum Disorder:")
    
    if user_input:
        response = "This is a placeholder response. The chatbot will answer your query soon!"
        st.write(f"🤖 **Bot:** {response}")
