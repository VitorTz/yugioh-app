import { Ionicons } from "@expo/vector-icons"
import { Colors } from "../constants/Colors"

export const icons = {
    "(tabs)/database": (props) => <Ionicons name='server-outline' size={22} color={Colors.orange} {...props}/>,
    "(tabs)/stats": (props) => <Ionicons name='pie-chart-outline' size={22} color={Colors.orange} {...props}/>,
    "(tabs)/collection": (props) => <Ionicons name='document-outline' size={22} color={Colors.orange} {...props}/>,
    "(tabs)/news": (props) => <Ionicons name='newspaper-outline' size={22} color={Colors.orange} {...props}/>,
    "(tabs)/profile": (props) => <Ionicons name='person-circle-outline' size={22} color={Colors.orange} {...props}/>
}