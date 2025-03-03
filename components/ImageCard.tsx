import { StyleSheet, View, Pressable, ActivityIndicator } from 'react-native'
import { getImageHeight, wp, hp } from '@/helpers/util'
import { Keyboard } from 'react-native'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { YuGiOhCard } from '@/helpers/types'
import { Colors } from '@/constants/Colors'
import { ColumnItem } from './FlashListColumnItem'
import { AppConstants, GRID_COLUMNS, IMAGE_GRID_HEIGHT, IMAGE_GRID_WIDTH } from '@/constants/AppConstants'
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
        <Pressable onPress={() => handlePress()} style={{alignItems: "center", flex: 1, marginTop: index >= GRID_COLUMNS ? 10 : 0}}>
            <Image
                style={styles.image}
                source={item.image_url}                    
            />                
        </Pressable>        
        
    )
}

export default ImageCard

const styles = StyleSheet.create({    
    image: {
        width: IMAGE_GRID_WIDTH,
        height: IMAGE_GRID_HEIGHT
    }   
})