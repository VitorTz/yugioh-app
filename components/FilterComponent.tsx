import { StyleSheet, Pressable, Text, View} from 'react-native'
import { Colors } from '@/constants/Colors'
import React, { useEffect, useState } from 'react'
import { AppConstants } from '@/constants/AppConstants'
import AppStyle from '@/constants/AppStyle'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Filter } from '@/helpers/types'



interface CategoryFilterProps {
    title: string
    items: string[]
    filter: Filter 
    filterKey: string   
    dismarkWhenPressedAgain: boolean
    defaultValue?: string | null
    shouldResetFilters: boolean
}


const FilterComponent = ({title, filterKey, items, filter, dismarkWhenPressedAgain, shouldResetFilters, defaultValue = null}: CategoryFilterProps) => {

    const [selected, setSelected] = useState<string | null>(defaultValue)

    useEffect(
        () => {
            if (shouldResetFilters) {
                setSelected(defaultValue)
            }
        },
        [shouldResetFilters]
    )

    const Item = ({name}: {name: string}) => {        
        const isSelected = selected == name;
        const color = isSelected ? Colors.red : Colors.background
        const handlePress = () => {
            if (isSelected && dismarkWhenPressedAgain) {
                setSelected(null)
                filter.set(filterKey, null)
            } else {
                setSelected(name)
                filter.set(filterKey, name)
            }            
        }
        return (
            <Pressable 
                onPress={() => handlePress()}
                hitSlop={AppConstants.hitSlopLarge}
                style={[styles.itemContainer, {backgroundColor: color}]}>
                <Text style={AppStyle.textRegular}>{name}</Text>
            </Pressable>
        )
    }

    return (
        <View style={styles.container} >
          <Text style={styles.title}>{title}</Text>
          <BottomSheetFlatList
            data={items}            
            horizontal={true}            
            keyExtractor={(item: string) => item}                                    
            renderItem={({item}) => {return (<Item name={item}/>)}
            }/>
        </View>
      )
}


export default FilterComponent


const styles = StyleSheet.create({
    container: {
        width: "100%", 
        gap: 10, 
        marginBottom: 10
    },
    title: {
        fontSize: 22, 
        fontFamily: "LeagueSpartan_600SemiBold", 
        color: Colors.orange
    },
    itemContainer: {
        paddingHorizontal: 20, 
        paddingVertical: 10,         
        borderRadius: 4, 
        marginRight: 10
    },
    itemText: {
        color: "white",
        fontFamily: "LeagueSpartan_400Regular",
        fontSize: 16
    }
})