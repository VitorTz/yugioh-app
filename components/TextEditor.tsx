import { View, Text, SafeAreaView } from "react-native";
import Editor from "./dom-components/hello-dom";
import { useState } from "react";
import AppStyle from "@/constants/AppStyle";
import { TextInput } from "react-native";
import { Colors } from "@/constants/Colors";
import { LeagueSpartan_400Regular } from "@expo-google-fonts/league-spartan";


const TextEditor = ({name}: {name: string}) => {

    const [plaintText, setPlainText] = useState('')
    const [editorState, setEditorState] = useState<string | null>(null)

    return (
        <View style={{flex: 1, gap: 10}} >
            <Text style={AppStyle.textHeader}>Title</Text>
            <TextInput
                style={{width: '100%', height: 50, borderRadius: 4, backgroundColor: Colors.gray, color: Colors.white, fontFamily: "LeagueSpartan_400Regular", paddingHorizontal: 10}}
                
            />
            <Text style={AppStyle.textHeader}>Description</Text>
            <Editor setPlainText={setPlainText}  setEditorState={setEditorState}  />
        </View>
    )
}


export default TextEditor;