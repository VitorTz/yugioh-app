import {     
    DECK_GRID_COLUMNS, 
    DECK_GRID_HEIGHT, 
    DECK_GRID_WIDTH,
    DECK_IMAGE_HEIGHT,
    DECK_IMAGE_WIDTH
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
        console.log(deck.name)
    }    

    const DeckInfo = ({title, info}: {title: string, info: string | number}) => {
        return (
            <View style={{width: '100%', flexDirection: "row", gap: 4}} >
                <Text style={[AppStyle.textRegular, {color: Colors.orange}]} >{title}:</Text>
                <Text style={AppStyle.textRegular} >{info}</Text>
            </View>
        )
    }

    return (        
        <Pressable onPress={() => handlePress()} style={{alignItems: "center", paddingVertical: 30, justifyContent: "center", borderRadius: 0, flex: 1, borderWidth: 1, borderColor: Colors.orange, marginTop: index >= DECK_GRID_COLUMNS ? 10 : 0}}>            
            <View style={{width: '100%', height: '100%'}}>
                <Image contentFit='scale-down' style={{width: '100%', height: DECK_IMAGE_HEIGHT, alignSelf: "center"}}  source={deck.image_url} />
            </View>
            <View style={{width: '100%', height: '30%', padding: 20, borderTopWidth: 1, borderColor: Colors.orange, marginHorizontal: 20, position: 'absolute', bottom: 0, backgroundColor: Colors.background}} >
                <DeckInfo title='Name' info={deck.name} />
                <DeckInfo title='Type' info={deck.type} />
                <DeckInfo title='Cards' info={deck.num_cards} />
            </View>
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