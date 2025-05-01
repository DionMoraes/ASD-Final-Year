// src/navigation/AppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LogoScreen from "../screens/LogoScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import UploadScreen from "../screens/UploadScreen";
import PredictionScreen from "../screens/PredictionScreen";
import AddDataScreen from "../screens/AddDataScreen";
import AboutASDScreen from "../screens/AboutASDScreen";
import SupportScreen from "../screens/SupportScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
   <NavigationContainer>
       <Stack.Navigator screenOptions={{ headerShown: false }}>
           <Stack.Screen name="Logo" component={LogoScreen} />
           <Stack.Screen name="Login" component={LoginScreen} />
           <Stack.Screen name="Register" component={RegisterScreen} />
           <Stack.Screen name="Home" component={HomeScreen} />
           <Stack.Screen name="Upload" component={UploadScreen} />
           <Stack.Screen name="Prediction" component={PredictionScreen} />
           <Stack.Screen name="AddData" component={AddDataScreen} />
           <Stack.Screen name="AboutASD" component={AboutASDScreen} />
           <Stack.Screen name="Support" component={SupportScreen} />
       </Stack.Navigator>
   </NavigationContainer>
);

export default AppNavigator;
