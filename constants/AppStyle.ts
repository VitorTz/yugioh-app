import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
import { hp, wp } from "@/helpers/util";


const AppStyle = StyleSheet.create({
    safeArea: {
        width: wp(100),
        height: hp(100),
        alignItems: "center",        
        backgroundColor: Colors.background, 
        paddingTop: 20,
        paddingBottom: 100,
        paddingHorizontal: 20
    },
    safeAreaLarge: {
        flex: 1, 
        backgroundColor: Colors.background, 
        alignItems: "center", 
        padding: 20
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
    },
    iconButton: {
        padding: 10, 
        backgroundColor: Colors.background,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.orange
    },
    backdrop: {
        backgroundColor: Colors.gray,         
        alignItems: "center", 
        justifyContent: "center", 
        width: "100%",
        maxHeight: hp(80),
        padding: 10,
        paddingVertical: 20,
        borderCurve: "continuous",
        borderRadius: 32
    },
    textUserName: {
        color: Colors.text, 
        fontFamily: "LeagueSpartan_400Regular", 
        fontSize: 18
    },
    textRegular: {
        color: Colors.white,
        fontFamily: "LeagueSpartan_400Regular",
        fontSize: 16
    }
})


export default AppStyle