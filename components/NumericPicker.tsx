import { TextInput, Pressable, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import { AppConstants } from '@/constants/AppConstants'
import { Colors } from '@/constants/Colors'
import React, { useState } from 'react'


interface NumberPickerProps {
    title: string
    apply: (input: string) => void
    maxLenght?: number
}


const NumericPicker = ({title, apply, maxLenght = 4}: NumberPickerProps) => {

    const [text, setText] = useState('')
    const [isLoading, setLoading] = useState(false)

    const handlePress = async () => {
        setLoading(true)
        await apply(text)
        setLoading(false)
        setText('')
    }

    return (
    <View style={{width: '100%', marginTop: 20, flexDirection: "row", gap: 10}} >
        <TextInput 
            keyboardType='numeric' 
            value={text}
            placeholder='0' 
            placeholderTextColor={Colors.white} 
            onChangeText={text => setText(text)}
            maxLength={maxLenght}
            style={{color: Colors.white, width: 80, padding: 20, backgroundColor: Colors.background, borderRadius: 4}} 
        />
        <Pressable 
            onPress={handlePress}
            hitSlop={AppConstants.hitSlop} 
            style={{paddingHorizontal: 20, flex: 1, borderRadius: 4, backgroundColor: Colors.orange, alignItems: "center", justifyContent: "center"}}>
                {
                    isLoading ?
                    <ActivityIndicator size={AppConstants.icon.size} color={Colors.white}/> :
                    <Text style={AppStyle.textRegular} >{title}</Text>
                }
        </Pressable>
    </View>
    )
}

export default NumericPicker

const styles = StyleSheet.create({})