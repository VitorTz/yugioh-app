import {     
    DECK_GRID_COLUMNS, 
    DECK_GRID_HEIGHT, 
    DECK_GRID_WIDTH
} from '@/constants/AppConstants'
import { StyleSheet, Pressable } from 'react-native'
import { YuGiOhDeck } from '@/helpers/types'
import { Keyboard } from 'react-native'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import React from 'react'


interface ImageCardProps {
    deck: YuGiOhDeck
    index: number
}


const DeckCard = ({deck, index}: ImageCardProps) => {    
    
    const handlePress = () => {
        Keyboard.dismiss()
        console.log(deck.name)
    }    

    return (        
        <Pressable onPress={() => handlePress()} style={{alignItems: "center", flex: 1, marginTop: index >= DECK_GRID_COLUMNS ? 10 : 0}}>
            <Image style={styles.image} source={deck.image_url}/>
        </Pressable>        
        
    )
}

export default DeckCard

const styles = StyleSheet.create({    
    image: {
        width: DECK_GRID_WIDTH,
        height: DECK_GRID_HEIGHT
    }   
})