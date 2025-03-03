import { StyleSheet, Text, TextInput, View } from 'react-native'
import { NumberFilterType } from '@/helpers/types'
import { Colors } from '@/constants/Colors'
import React from 'react'
import AppStyle from '@/constants/AppStyle'


interface NumberFilterProps {
    title: string
    number: any
    setNumber: any
    maxLenght: number
}


const NumberFilter = ({title, number, setNumber, maxLenght}: NumberFilterProps) => {
    return (
        <View style={{gap: 10, marginBottom: 10}} >
            <Text style={AppStyle.textHeader}>{title}</Text>
            <TextInput
                placeholderTextColor={Colors.white}
                value={number}
                placeholder="0"
                maxLength={maxLenght}
                keyboardType="numeric"
                onChangeText={text => setNumber(text)}
                style={[styles.input]}
            />
        </View>
    )
}

export default NumberFilter

const styles = StyleSheet.create({    
    input: {        
        paddingLeft: 14, 
        height: 42, 
        width: 80,
        color: Colors.white, 
        backgroundColor: Colors.background, 
        borderWidth: 1, 
        borderColor: Colors.orange, 
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    }
})