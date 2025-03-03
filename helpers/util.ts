import Toast from "react-native-toast-message";
import { ToastType } from "react-native-toast-message";
import { Platform } from "react-native";

import { Dimensions } from "react-native";


const {
    width: deviceWidth, 
    height: deviceHeight
} = Dimensions.get('window');


export function wp(percentage: number): number {
    const width = deviceWidth;
    return (percentage * width) / 100;
}


export function hp(percentage: number): number {
    const height = deviceHeight;
    return (percentage * height) / 100;
}


export const showToast = (title: string, message: string, toastType: ToastType) => {    
    Toast.show({
        type: toastType,
        text1: title,
        text2: message
    });
}


export function toTitleCase(str: string): string {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}


export const getImageHeight = (height: number, width: number) => {
    let h = Platform.OS === "web" ? 200 : 0
    if (width > height) {
        h += 300
    } else if (width < height) {
        h += 450
    } else {
        h += 250
    }
    return h
}