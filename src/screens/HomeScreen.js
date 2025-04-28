import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Linking } from "react-native"; // Imported Linking here
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomeScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setModalVisible(false);
            navigation.replace("Logo");
        } catch (error) {
            alert("Logout failed: " + error.message);
        }
    };

    const getUserName = () => {
        if (user) {
            return user.displayName ? user.displayName : user.email.split("@")[0];
        }
        return "No User";
    };

    const openStreamlitApp = async () => {
        const url = "http://localhost:8501/";
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            alert("Can't open the Streamlit app URL");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Ionicons name="home" size={28} color="white" />
                    <Text style={styles.headerText}>Home</Text>
                </View>

                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profileCircle}>
                    {user ? (
                        <Text style={styles.profileText}>
                            {user.displayName ? user.displayName.charAt(0) : user.email.charAt(0)}
                        </Text>
                    ) : (
                        <FontAwesome5 name="user-circle" size={28} color="white" />
                    )}
                </TouchableOpacity>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuButton} onPress={openStreamlitApp}>
                    <FontAwesome5 name="stethoscope" size={40} color="white" />
                    <Text style={styles.menuText}>Diagnose</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("AddData")}>
                    <FontAwesome5 name="plus-circle" size={40} color="white" />
                    <Text style={styles.menuText}>Add Data</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate("AboutASD")}>
                    <FontAwesome5 name="info-circle" size={40} color="white" />
                    <Text style={styles.menuText}>About ASD</Text>
                </TouchableOpacity>

            </View>

            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.userName}>{getUserName()}</Text>

                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#AFC6DA", alignItems: "center", justifyContent: "center" },

    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "#4B6587",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
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
    profileCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#2C3E50",
        alignItems: "center",
        justifyContent: "center",
    },
    profileText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },

    menuContainer: {
        width: "80%",
        justifyContent: "center",
        marginTop: 100, 
    },
    menuButton: {
        backgroundColor: "#4B6587",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        marginVertical: 10,
    },
    menuText: {
        color: "white",
        fontSize: 18,
        marginTop: 5,
        fontWeight: "bold",
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    userName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: "#D9534F",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    logoutText: {
        color: "white",
        fontSize: 16,
    },
    closeButton: {
        marginTop: 10,
    },
    closeText: {
        color: "#4B6587",
        fontSize: 16,
    },
});

export default HomeScreen;
