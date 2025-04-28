// src/components/Footer.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => (
   <View style={styles.footer}>
       <Text style={styles.text}>ASD Detection App</Text>
   </View>
);

const styles = StyleSheet.create({
   footer: {
       backgroundColor: "#4B6587",
       padding: 10,
       alignItems: "center",
       position: "absolute",
       bottom: 0,
       width: "100%",
   },
   text: {
       color: "white",
       fontSize: 14,
   },
});

export default Footer;
