import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Footer from "../components/Footer";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();

    const handleRegister = async () => {
        if (!name || !email || !password) {
            Alert.alert("Error", "All fields are required!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
            });

 
            navigation.navigate("Login");

            setEmail("");
            setPassword("");
            setName("");

        } catch (error) {
            Alert.alert("Registration Failed", error.message);
        }
    };

    return (
        <View style={styles.container}>
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Register</Text>
            </View>

            {/* Registration Form */}
            <View style={styles.formContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput 
                    placeholder="Enter full name" 
                    value={name} 
                    onChangeText={setName} 
                    style={styles.input} 
                />

                <Text style={styles.label}>Email</Text>
                <TextInput 
                    placeholder="Enter email" 
                    value={email} 
                    onChangeText={setEmail} 
                    style={styles.input} 
                    keyboardType="email-address" 
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>
                <TextInput 
                    placeholder="Enter password" 
                    value={password} 
                    onChangeText={setPassword} 
                    style={styles.input} 
                    secureTextEntry 
                />

                
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
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
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 25,
        paddingHorizontal: 15,
    },
    backButton: {
        marginRight: 15,
    },
    headerText: {
        color: "white",
        fontSize: 22,
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
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default RegisterScreen;
