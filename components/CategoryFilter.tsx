import { StyleSheet, Pressable, Text, View} from 'react-native'
import { Colors } from '@/constants/Colors'
import React from 'react'
import { AppConstants } from '@/constants/AppConstants'
import AppStyle from '@/constants/AppStyle'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import CategoryItem from './CategoryItem'


interface CategoryFilterProps {
    title: string
    items: string[]
    selected: any
    setSelected: React.Dispatch<React.SetStateAction<any>>
    dismarkWhenPressedAgain: boolean
}


const FilterComponent = ({title, items, selected, setSelected, dismarkWhenPressedAgain}: CategoryFilterProps) => {

    const Item = ({name}: {name: string}) => {
        const isSelected = selected == name;
        const color = isSelected ? Colors.red : Colors.background
        const handlePress = () => {
            isSelected && dismarkWhenPressedAgain ? setSelected(null) : setSelected(name)
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