import {     
    DECK_GRID_COLUMNS, 
    DECK_GRID_HEIGHT, 
    DECK_GRID_WIDTH    
} from '@/constants/AppConstants'
import { StyleSheet, Pressable, View, Text } from 'react-native'
import { YuGiOhDeck } from '@/helpers/types'
import { Keyboard } from 'react-native'
import { router } from 'expo-router'
import { Image, ImageBackground } from 'expo-image'
import React from 'react'
import AppStyle from '@/constants/AppStyle'
import { Colors } from '@/constants/Colors'


interface ImageCardProps {
    deck: YuGiOhDeck
    index: number
}


const DeckCard = ({deck, index}: ImageCardProps) => {    
    
    const handlePress = () => {
        Keyboard.dismiss()            
        router.push({pathname: "/(pages)/deckPage", params: deck})
    }

    const DeckInfo = ({title}: {title: string | number}) => {
        return (
            <Text style={[AppStyle.textRegular, {color: Colors.white}]} >
                {title}
            </Text>            
        )
    }

    return (        
        <Pressable onPress={() => handlePress()} style={{flex: 1,  alignItems: "center", marginTop: index >= DECK_GRID_COLUMNS ? 10 : 0}}>
            <Image contentFit='cover'  style={styles.image} source={"https://res.cloudinary.com/dutf5vtcr/image/upload/v1741175439/yu-gi-oh/cropped/1/fuezn4qrnt9wxidqfjnw.jpg"}/>            
            <View style={{padding: 10, backgroundColor: Colors.gray, paddingVertical: 20, width: DECK_GRID_WIDTH, borderTopWidth: 4, borderColor: Colors.orange}} >
                <DeckInfo title={deck.name} />
                <DeckInfo title={`${deck.type} Deck`} />
                <DeckInfo title={`${deck.num_cards} cards`} />
            </View>
        </Pressable>
    )
}

export default DeckCard

const styles = StyleSheet.create({
    container: {
        alignItems: "center", 
        paddingVertical: 30, 
        justifyContent: "center", 
        borderRadius: 0, 
        width: DECK_GRID_WIDTH,
        height: DECK_GRID_HEIGHT,
        borderWidth: 1, 
        borderColor: Colors.orange 
    },
    image: {    
        width: DECK_GRID_WIDTH,
        height: DECK_GRID_HEIGHT        
    }   
})