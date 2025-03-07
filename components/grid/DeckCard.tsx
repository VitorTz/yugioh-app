import { StyleSheet, Pressable, View, Text } from 'react-native'
import { YuGiOhDeck } from '@/helpers/types'
import { Keyboard } from 'react-native'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import React from 'react'
import AppStyle from '@/constants/AppStyle'
import { Colors } from '@/constants/Colors'


interface ImageCardProps {
    deck: YuGiOhDeck
    index: number
    columns: number
    width: number
    height: number
}


const DeckCard = ({deck, index, columns, width, height}: ImageCardProps) => {    
    
    const handlePress = () => {
        Keyboard.dismiss()            
        router.push({pathname: "/(pages)/deckPage", params: deck})
    }

    const DeckInfo = ({title}: {title: string | number}) => {
        return (
            <Text style={[AppStyle.textRegular, {color: Colors.white}]}>{title}</Text>
        )
    }
    
    return (        
        <Pressable onPress={() => handlePress()} style={[styles.button, {marginTop: index >= columns ? 10 : 0}]}>
            <Image contentFit='cover'  style={{width, height}} source={deck.image_url}/>
            <View style={[styles.container, {width: width}]} >
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
        padding: 10, 
        backgroundColor: Colors.gray, 
        paddingVertical: 20,         
        borderTopWidth: 4, 
        borderColor: Colors.orange
    },    
    button: {
        flex: 1,
        alignItems: "center"        
    }
})