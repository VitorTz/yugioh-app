import { StyleSheet, Text, TextInput, View } from 'react-native'
import { NumberFilterType } from '@/helpers/types'
import { Colors } from '@/constants/Colors'
import React from 'react'
import NumberItem from './NumberItem'


interface NumberFilterProps {
    title: string
    filter: NumberFilterType
    setFilter: React.Dispatch<React.SetStateAction<NumberFilterType>>
}


const NumberFilter = ({title, filter, setFilter}: NumberFilterProps) => {

    const handleChangeText = (text: string) => {
        if (text.length > 0 && text.at(0) == '0') {
            text = text.substring(1)
        }
        setFilter({
            number: text,
            comp: filter.comp
        })
    }

    const width = title == "Level" ? 42 : 80

    return (
        <View style={{width: "100%", gap: 10, marginBottom: 10}} >
        <Text style={styles.header}>{title}</Text>
        <View style={styles.optionContainer}>
            <TextInput
                placeholderTextColor={Colors.white}
                value={filter.number}
                placeholder="0"
                maxLength={title == "Level" ? 2 : 5}
                keyboardType="numeric"
                onChangeText={text => handleChangeText(text)}
                style={[styles.input, {width: width}]}
            />
            <NumberItem name='Equal' filter={filter} setFilter={setFilter} />
            <NumberItem name='Greater' filter={filter} setFilter={setFilter} />
            <NumberItem name='Greater or equal' filter={filter} setFilter={setFilter} />            
        </View>
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