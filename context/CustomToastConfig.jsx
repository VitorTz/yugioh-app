import { View, Text, StyleSheet } from "react-native"
import Toast from "react-native-toast-message"
import { Colors } from "../constants/Colors"
import { wp, hp } from "../helpers/common"


export const toastConfig = {
    success: ({text1, text2, props, ...rest}) => {
    return (
        <View style={styles.toast}> 
            <Text style={styles.toastText}>{text1}</Text>
            <Text style={styles.toastText2}>{text2}</Text>
        </View>
        )
    }
}


export const showToast = (title, msg) => {        
    Toast.show(
        {
            type: "success",              
            text1: title,
            text2: msg,              
            position: "top"                
        }
    )
}


const styles = StyleSheet.create({
    toast: {    
        padding: 15,        
        width: wp(94),
        paddingHorizontal: 30,
        borderRadius: 4,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: Colors.white
    },
    toastText: {
        fontSize: hp(1.8),
        fontWeight: "600",
        color: Colors.black
    },
    toastText2: {
        fontSize: hp(1.8),
        fontWeight: "400",
        color: Colors.black
    }
})