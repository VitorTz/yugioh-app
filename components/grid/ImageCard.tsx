import { 
    CARD_GRID_COLUMNS, 
    CARD_GRID_HEIGHT, 
    CARD_GRID_WIDTH 
} from '@/constants/AppConstants'
import { StyleSheet, Pressable, Text, View } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import { YuGiOhCard } from '@/helpers/types'
import { Colors } from '@/constants/Colors'
import { Keyboard } from 'react-native'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import React from 'react'


interface ImageCardProps {
    card: YuGiOhCard
    index: number
}


const ImageCard = ({card, index}: ImageCardProps) => {    
    
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

    const CardInfo = ({title, info}: {title: string, info: string | number | null | undefined}) => {
        if (!info) {
            return <></>
        }
        return (
            <Text style={[AppStyle.textRegular, {color: Colors.orange}]} >
                {title}:{' '}
                <Text style={[AppStyle.textRegular, {color: Colors.white}]} >
                    {info}
                </Text>
            </Text>
        )
    }
    
    return (        
        <Pressable onPress={() => handlePress()} style={{flex: 1,  alignItems: "center", marginTop: index >= CARD_GRID_COLUMNS ? 10 : 0}}>
            <Image contentFit='cover'  style={styles.image} source={card.cropped_image_url}/>
            <View style={{padding: 10, backgroundColor: Colors.gray, paddingVertical: 10, width: CARD_GRID_WIDTH, borderTopWidth: 2, borderColor: Colors.orange}} >
                <CardInfo title='Name' info={card.name} />
                <View style={{flexDirection: "row", columnGap: 20, flexWrap: "wrap", alignItems: "center", justifyContent: "flex-start"}} >
                    <CardInfo title='Attack' info={card.attack} />
                    <CardInfo title='Defence' info={card.defence} />
                    <CardInfo title='Level' info={card.level} />
                    <CardInfo title='Archetype' info={card.archetype} />
                    <CardInfo title='Attribute' info={card.attribute} />
                    <CardInfo title='Frametype' info={card.frametype} />
                    <CardInfo title='Race' info={card.race} />
                    <CardInfo title='Type' info={card.type} />                
                </View>
            </View>
        </Pressable>
    )
}

export default ImageCard

const styles = StyleSheet.create({    
    image: {
        width: CARD_GRID_WIDTH,
        height: CARD_GRID_HEIGHT
    }   
})