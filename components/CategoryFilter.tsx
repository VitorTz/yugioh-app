import { StyleSheet, Text, View} from 'react-native'
import { Colors } from '@/constants/Colors'
import React from 'react'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import CategoryItem from './CategoryItem'


interface CategoryFilterProps {
    title: string
    items: string[]
    filter: string | null
    setFilter: React.Dispatch<React.SetStateAction<string | null>>
    dismarkWhenPressedAgain: boolean
}


const CategoryFilter = ({title, items, filter, setFilter, dismarkWhenPressedAgain}: CategoryFilterProps) => {
    return (
        <View style={styles.container} >
          <Text style={styles.title}>{title}</Text>
          <BottomSheetFlatList
            data={items}            
            horizontal={true}            
            keyExtractor={(item: string) => item}                                    
            renderItem={({item}) => {                
                return (
                    <CategoryItem 
                        item={item} 
                        filter={filter} 
                        setFilter={setFilter}
                        dismarkWhenPressedAgain={dismarkWhenPressedAgain}
                    />
                )
                }
            }/>
        </View>
      )
}


export default CategoryFilter


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