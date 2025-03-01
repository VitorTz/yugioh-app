import { StyleSheet, Text, Pressable, View } from 'react-native'
import { AppConstants } from '@/constants/AppConstants'
import { Colors } from '@/constants/Colors'
import React from 'react'
import AppStyle from '@/constants/AppStyle'

interface CategoryItem {
    item: string
    filter: string | null
    setFilter: React.Dispatch<React.SetStateAction<string | null>>
}


const CategoryItem = ({item, filter, setFilter}: CategoryItem) => {
    const color = filter == item ? Colors.red : Colors.background    
    return (
        <Pressable 
            onPress={() => filter == item ? setFilter(null) : setFilter(item)}
            hitSlop={AppConstants.hitSlopLarge}
            style={[styles.itemContainer, {backgroundColor: color}]}>
            <Text style={AppStyle.textRegular}>{item}</Text>
        </Pressable>
    )
}

const same = (prev: CategoryItem, next: CategoryItem) => {
    return prev.filter == next.filter
}


export default React.memo(CategoryItem, same)


const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: 20, 
        paddingVertical: 10,         
        borderRadius: 4, 
        marginRight: 10
    }
})