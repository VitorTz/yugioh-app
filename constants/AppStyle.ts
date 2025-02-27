import { StyleSheet } from "react-native";
import { Colors } from "./Colors";


const AppStyle = StyleSheet.create({
    safeArea: {
        flex: 1, 
        alignItems: "center",        
        backgroundColor: Colors.background, 
        paddingTop: 20,
        paddingBottom: 100,
        paddingHorizontal: 20
    },
    form: {        
        padding: 20        
    },
    formTitle: {
        fontSize: 20,
        color: Colors.white,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'left'
    }
})

export default AppStyle