import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { wp, hp } from "../helpers/common";

const AppStyle = StyleSheet.create({
    safeArea: {
        flex: 1, 
        alignItems: "center",        
        backgroundColor: Colors.background, 
        paddingTop: 20,
        paddingBottom: 100,
        paddingHorizontal: 10
    },
    searchBar: {
        width: '100%',
        height: 50,    
        paddingHorizontal: 45,    
        color: "white",
        borderWidth: 2,
        borderRadius: 4,
        backgroundColor: Colors.gray,
        borderColor: Colors.black
    },
    hitSlop: {
        left: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
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
    },
    error: {
        color: Colors.orange,
        fontWeight: "300",
        fontSize: 14,
        alignSelf: "flex-start"
    },
    textInputHeader: {
        color: "white", 
        alignSelf: "flex-start",     
        fontWeight: "bold", 
        fontSize: 14
    },
    input: {
        paddingLeft: 10,
        width: '100%',    
        height: 50,
        color: "white",
        borderRadius: 4,
        backgroundColor: Colors.gray1    
    },
    form: {
        width: '100%',
        gap: 10,
        alignItems: "center",
        justifyContent: "center"
    },    
    formButton: {
        width: '100%', 
        backgroundColor: Colors.orange, 
        alignItems: "center",
        borderRadius: 4,
        marginTop: 10, 
        justifyContent: "center", 
        height: 50
    }
})

export default AppStyle