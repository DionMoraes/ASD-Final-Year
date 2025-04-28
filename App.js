import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LogoScreen from "./src/screens/LogoScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import UploadScreen from "./src/screens/UploadScreen";
import PredictionScreen from "./src/screens/PredictionScreen";
import AddDataScreen from "./src/screens/AddDataScreen";
import AboutASDScreen from "./src/screens/AboutASDScreen";
import SupportScreen from "./src/screens/SupportScreen";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-react-native";
import { useEffect } from "react";

const Stack = createStackNavigator();

export default function App() {
    useEffect(() => {
        const initTensorFlow = async () => {
            await tf.ready();
            console.log("TensorFlow.js is ready!");
        };

        initTensorFlow();
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Logo">
            
                <Stack.Screen 
                    name="Logo" 
                    component={LogoScreen} 
                    options={{ headerShown: false }} 
                />

        
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Register" 
                    component={RegisterScreen} 
                    options={{ headerShown: false }} 
                />

            
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ headerShown: false }} 
                />

                
                <Stack.Screen name="AddData" component={AddDataScreen} />
                <Stack.Screen name="AboutASD" component={AboutASDScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
