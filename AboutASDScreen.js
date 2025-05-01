import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Footer from "../components/Footer";

const AboutASDScreen = () => {
    return (
        <View style={styles.container}>
        
            <View style={styles.header}>
                <Ionicons name="information-circle" size={28} color="white" />
                <Text style={styles.headerText}>About ASD</Text>
            </View>

            
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.card}>
                    <Text style={styles.title}>What is Autism Spectrum Disorder (ASD)?</Text>
                    <Text style={styles.description}>
                        Autism Spectrum Disorder (ASD) is a developmental condition affecting 
                        communication, behavior, and social interactions. It is called a "spectrum" 
                        because symptoms vary widely from person to person.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Symptoms of ASD</Text>
                    <Text style={styles.description}>
                        • Difficulty with communication and social interactions{'\n'}
                        • Repetitive behaviors and intense interests{'\n'}
                        • Sensory sensitivities (light, sound, touch){'\n'}
                        • Challenges in understanding emotions and body language
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Causes of ASD</Text>
                    <Text style={styles.description}>
                        The exact causes of ASD are unknown, but factors like genetics, brain 
                        development differences, and environmental influences may play a role.
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Remedies and Support</Text>
                    <Text style={styles.description}>
                        Behavioral therapy to develop social skills{'\n'}
                        Speech and occupational therapy{'\n'}
                        Sensory integration techniques{'\n'}
                        Structured learning environments and support networks
                    </Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.title}>Diagnosis Measures</Text>
                    <Text style={styles.description}>
                        • Developmental screenings by pediatricians{'\n'}
                        • Comprehensive behavioral evaluations{'\n'}
                        • Psychological assessment
                    </Text>
                </View>
            </ScrollView>

    
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6F9", 
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 80,
        backgroundColor: "#2C3E50", 
        paddingTop: 30,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    headerText: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        marginLeft: 10,
    },
    content: {
        paddingTop: 20,
        paddingBottom: 30,
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2C3E50",
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: "#555",
        lineHeight: 22,
        textAlign: "justify",
    },
});

export default AboutASDScreen;
