import { useRef } from "react";
import { Animated } from "react-native";

export const useFade = () => {
    
 // animated (propio de react native)
 const opacity = useRef(new Animated.Value(0)).current; //extraigo el current del objeto Animated

 const fadeIn = ( cb?:Function ) => {
     // timing para manejar el tiempo
     Animated.timing(
         opacity,
         {
             toValue: 1,
             duration: 300,
             useNativeDriver: true
         }
     ).start(()=> cb ? cb() : null);
 }

 const fadeOut = (duration:number=300) => {
     // timing para manejar el tiempo
     Animated.timing(
         opacity,
         {
             toValue: 0,
             duration: duration,
             useNativeDriver: true
         }
     ).start();
 }

 return{
    opacity,
    fadeIn,
    fadeOut,
 }

};
