import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

const LogoScreen = ({ navigation }) => (
   <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.navigate("Login")}>
           <Image source={require("../../assets/img1.jpg")} style={styles.img1} />
       </TouchableOpacity>
   </View>
);

const styles = StyleSheet.create({
   container: { 
       flex: 1, 
       justifyContent: "center", 
       alignItems: "center",
       backgroundColor: "#AFC6DA", 
   },
   logo: { width: 200, height: 200 },
});

export default LogoScreen;
