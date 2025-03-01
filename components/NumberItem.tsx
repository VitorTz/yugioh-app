import { StyleSheet, Text, View, Pressable } from 'react-native'
import { NumberFilterType, NumberComp } from '@/helpers/types'
import { Colors } from '@/constants/Colors'
import React from 'react'
import AppStyle from '@/constants/AppStyle'


interface NumerItemProps {
    name: NumberComp
    filter: NumberFilterType
    setFilter: React.Dispatch<React.SetStateAction<NumberFilterType>>
}


const NumberItem = ({name, filter, setFilter}: NumerItemProps) => {
    const handleChangeComp = (comp: NumberComp | null) => {
        setFilter({
            number: filter.number,
            comp: filter.comp == comp ? null : comp
        })
    }
    const color = filter.comp == name ? Colors.red : Colors.background

    return (
        <Pressable 
            onPress={() => handleChangeComp(name) }
            style={[styles.container, {backgroundColor: color}]}>
            <Text style={AppStyle.textRegular}>{name}</Text>
        </Pressable>
    )
}

export default NumberItem

const styles = StyleSheet.create({
    container: {
        height: 42, 
        paddingHorizontal: 10, 
        borderRadius: 4,         
        alignItems: "center", 
        justifyContent: "center"
    }
})