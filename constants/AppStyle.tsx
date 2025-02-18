import { StyleSheet } from "react-native";
import { Colors } from "./Colors";



const AppStyle = StyleSheet.create({
    safeArea: {
        flex: 1, 
        alignItems: "center",
        backgroundColor: Colors.background, 
        padding: 20
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: Colors.pinkAccent,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2
    },
    buttonText: {
        color: Colors.white,
        fontSize: 22
    },
    textInput: {
        width: '100%',
        backgroundColor: Colors.pink,
        borderWidth: 1,
        borderColor: Colors.pinkAccent,
        paddingHorizontal: 10,
        marginBottom: 10,
        height: 50        
    },
    errorText: {
        color: "red",
        fontSize: 14        
    },
    imageButton: {
        width: 64,
        height: 64,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.pink,
        borderWidth: 1,
        borderColor: Colors.pinkAccent
    }
})

export default AppStyle