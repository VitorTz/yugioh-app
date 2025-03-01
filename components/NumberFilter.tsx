import { StyleSheet, Text, TextInput, View } from 'react-native'
import { NumberFilterType } from '@/helpers/types'
import { Colors } from '@/constants/Colors'
import React from 'react'


interface NumberFilterProps {
    title: string
    filter: NumberFilterType
    setFilter: React.Dispatch<React.SetStateAction<NumberFilterType>>
}


const NumberFilter = ({title, filter, setFilter}: NumberFilterProps) => {

    const handleChangeText = (text: string) => {        
        setFilter({
            number: text,
            comp: filter.comp
        })
    }
    
    return (
        <View style={{gap: 10, marginBottom: 10}} >
        <Text style={styles.header}>{title}</Text>
            <TextInput
                placeholderTextColor={Colors.white}
                value={filter.number}
                placeholder="0"
                maxLength={4}
                keyboardType="numeric"
                onChangeText={text => handleChangeText(text)}
                style={[styles.input]}
            />
        </View>
    )
}

export default NumberFilter

const styles = StyleSheet.create({
    header: {
        fontSize: 22, 
        fontFamily: "LeagueSpartan_600SemiBold", 
        color: Colors.orange
    },
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
    },
    optionContainer: {
        flexDirection: "row", 
        gap: 10, 
        alignItems: "center", 
        justifyContent: "flex-start"
    }
})