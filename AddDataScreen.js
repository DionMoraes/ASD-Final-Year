import React, { useState } from "react";
import {
    View, Text, TextInput, Button, StyleSheet, Alert, SafeAreaView,
    TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform
} from "react-native";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";

const AddDataScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [sensory, setSensory] = useState("");
    const [triggers, setTriggers] = useState("");

    const handleSubmit = async () => {
        try {
            await addDoc(collection(db, "MedData"), {
                name,
                age,
                sensory,
                triggers,
                timestamp: new Date(),
            });
            
            Alert.alert("Success", "Data added successfully!");
            setName("");
            setAge("");
            setSensory("");
            setTriggers("");

            // Navigate back to HomeScreen
            navigation.navigate("HomeScreen");
        } catch (error) {
            Alert.alert("Error", "Failed to add data: " + error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Ionicons name="person-add" size={28} color="white" />
                    <Text style={styles.headerText}>Add Patient Data</Text>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flexGrow}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <TextInput
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        placeholder="Age"
                        value={age}
                        onChangeText={setAge}
                        style={styles.input}
                        keyboardType="numeric"
                        placeholderTextColor="white"
                    />
                    <TextInput
                        placeholder="Sensory Sensitivities"
                        value={sensory}
                        onChangeText={setSensory}
                        style={styles.input}
                        placeholderTextColor="white"
                    />
                    <TextInput
                        placeholder="Triggers"
                        value={triggers}
                        onChangeText={setTriggers}
                        style={styles.input}
                        placeholderTextColor="white"
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Footer */}
            <Footer />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#AFC6DA", 
    },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "#2C3E50",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 25,
        zIndex: 1000,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
    },
    headerText: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 10,
    },
    flexGrow: {
        flex: 1,
        marginTop: 80,
        marginBottom: 60,
    },
    scrollContent: {
        padding: 20,
        alignItems: "center",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "white",
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        color: "white",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    submitButton: {
        backgroundColor: "#2980B9",
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        alignItems: "center",
        width: "100%",
    },
    submitText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default AddDataScreen;
