import Toast from "react-native-toast-message";
import { ToastType } from "react-native-toast-message";
import * as FileSystem from 'expo-file-system'
import { API_CARD_WIDTH, API_CARD_HEIGHT, API_CARD_CROPPED_HEIGHT, API_CARD_CROPPED_WIDTH } from "@/constants/AppConstants";
import { sleep } from "./sleep";
import { Dimensions } from "react-native";
import { Colors } from "@/constants/Colors";


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
        text2: message,
        position: "bottom",
        bottomOffset: 40,
        keyboardOffset: 10,
        text1Style: {
            fontFamily: "LeagueSpartan_600SemiBold",
            fontSize: 16,
            color: Colors.background
        },
        text2Style: {
            fontFamily: "LeagueSpartan_400Regular",
            fontSize: 16,
            color: Colors.background
        }
    });
}

export function toTitleCase(str: string): string {
    return str.replace(
        /\w\S*/g,
        text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

export function getImageHeight(width: number): number {
    return width * (API_CARD_HEIGHT / API_CARD_WIDTH)
}

export function getImageHeightCropped(width: number): number {
    return width * (API_CARD_CROPPED_HEIGHT / API_CARD_CROPPED_WIDTH)
}


export function getItemGridDimensions(
    horizontalPadding: number,
    gap: number,
    columns: number,
    originalWidth: number,
    originalHeight: number
): {width: number, height: number} {
    const cardWidth = (wp(100) - horizontalPadding - (columns * gap)) / columns
    const cardHeight = cardWidth * (originalHeight / originalWidth)
    return {width: cardWidth, height: cardHeight}
}

export const downloadImage = async (fileName: string, imageUrl: string): Promise<{path: string, status: number, success: boolean}> => {
    const imageFilePath = `${FileSystem.documentDirectory}${fileName}`
    try {        
        const {uri, status} = await FileSystem.downloadAsync(imageUrl, imageFilePath)
        return {path: uri, success: true, status}
    } catch (err) {
        console.log(err)        
        return {success: false, status: 500, path: ''}
    }
}

export default function removeTrailingNewlines(str: string): string {
    return str.replace(/\n+$/, '');
  }