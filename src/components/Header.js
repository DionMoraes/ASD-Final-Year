import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal } from "react-native";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = ({ title, navigation }) => {
    const [user, setUser] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setModalVisible(false);
            navigation.navigate("Login"); // Redirect to Login page after logout
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>

            {/* Profile Section */}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.profileCircle}>
                <Text style={styles.profileText}>
                    {user ? user.displayName?.charAt(0).toUpperCase() : "U"}
                </Text>
            </TouchableOpacity>

            {/* Dropdown Modal */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {user ? (
                            <>
                                <Text style={styles.modalText}>{user.displayName || "User"}</Text>
                                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                                    <Text style={styles.logoutText}>Logout</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <Text style={styles.modalText}>Not Logged In</Text>
                        )}
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#6200ea",
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
    profileCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#ddd",
        justifyContent: "center",
        alignItems: "center",
    },
    profileText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#6200ea",
    },
    modalOverlay: {
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
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: "#e63946",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    logoutText: {
        color: "white",
        fontWeight: "bold",
    },
    closeButton: {
        marginTop: 10,
    },
    closeText: {
        color: "#6200ea",
    },
});

export default Header;
