import { StyleSheet, Pressable } from 'react-native'
import { YuGiOhCard } from '@/helpers/types'
import { Keyboard } from 'react-native'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import React from 'react'


interface ImageCardProps {
    card: YuGiOhCard
    index: number
    gridColumns: number
    width: number
    height: number
}


const ImageCard = ({card, index, gridColumns, width, height}: ImageCardProps) => {    
    console.log(card.name)
    const handlePress = () => {
        Keyboard.dismiss()
        router.push(
            {
                pathname: "/(pages)/cardPage",
                params: {
                    name: card.name,
                    card_id: card.card_id,
                    archetype: card.archetype,
                    attribute: card.attribute,
                    level: card.level,
                    race: card.race,
                    frametype: card.frametype,
                    attack: card.attack,
                    defence: card.defence,
                    descr: card.descr,
                    type: card.type,
                    image_url: card.image_url
                }
            }
        )
    }    
    
    return (        
        <Pressable onPress={() => handlePress()} style={{flex: 1,  alignItems: "center", width: width, height: height, marginTop: gridColumns != 0 ? (index >= gridColumns ? 10 : 0)  : 0}}>
            <Image contentFit='cover' style={{width: width, height: height}} source={card.image_url}/>            
        </Pressable>
    )
}

export default ImageCard


const styles = StyleSheet.create({})