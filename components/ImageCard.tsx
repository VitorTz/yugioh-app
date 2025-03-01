import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native'
import { getImageHeight, wp, hp } from '@/helpers/util'
import { Keyboard } from 'react-native'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { YuGiOhCard } from '@/helpers/types'
import { Colors } from '@/constants/Colors'
import { ColumnItem } from './FlashListColumnItem'
import { AppConstants } from '@/constants/AppConstants'
import { router } from 'expo-router'


interface ImageCardProps {
    item: YuGiOhCard
    index: number
}

const ImageCard = ({item, index}: ImageCardProps) => {    
    
    const handlePress = () => {
        Keyboard.dismiss()
        router.push(
            {
                pathname: "/(pages)/cardPage",
                params: {
                    name: item.name,
                    card_id: item.card_id,
                    archetype: item.archetype,
                    attribute: item.attribute,
                    level: item.level,
                    race: item.race,
                    frametype: item.frametype,
                    attack: item.attack,
                    defence: item.defence,
                    descr: item.descr,
                    type: item.type,
                    image_url: item.image_url
                }
            }
        )
    }

    return (        
        <ColumnItem index={index} numColumns={AppConstants.gridColumns} >
            <Pressable onPress={() => handlePress()}>
                <Image
                    style={styles.image}
                    source={item.image_url}                    
                />                
            </Pressable>        
        </ColumnItem>
    )
}

export default ImageCard

const styles = StyleSheet.create({    
    image: {
        width: 90,
        height: 128
    }   
})