import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigation.navigate("Home");
        } catch (error) {
            alert("Login failed: " + error.message);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Login</Text>
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>


            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#AFC6DA", 
        alignItems: "center", 
        justifyContent: "center" 
    },


    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "#4B6587",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 25,
    },
    headerText: {
        color: "white",
        fontSize: 24,
        fontWeight: "bold",
    },

    
    formContainer: {
        width: "80%",
        marginTop: 100, 
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        elevation: 5, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#4B6587",
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },


    button: {
        backgroundColor: "#4B6587",
        padding: 12,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default LoginScreen;
