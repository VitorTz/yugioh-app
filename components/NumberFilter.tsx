import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Filter, NumberFilterType } from '@/helpers/types'
import { Colors } from '@/constants/Colors'
import React, { useEffect, useRef } from 'react'
import AppStyle from '@/constants/AppStyle'


interface NumberFilterProps {
    title: string
    filter: Filter
    filterKey: string
    maxLenght: number
    shouldResetFilter: boolean
}


const NumberFilter = ({title, filter, filterKey, maxLenght, shouldResetFilter}: NumberFilterProps) => {

    const ref = useRef<TextInput>(null)

    useEffect(
        () => {
            if (shouldResetFilter) {
                ref.current?.clear()
            }
        },
        [shouldResetFilter]
    )

    return (
        <View style={{gap: 10, marginBottom: 10}} >
            <Text style={AppStyle.textHeader}>{title}</Text>
            <TextInput
                ref={ref}
                placeholderTextColor={Colors.white}                
                placeholder="0"
                maxLength={maxLenght}
                keyboardType="numeric"
                onChangeText={text => filter.set(filterKey, text)}
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