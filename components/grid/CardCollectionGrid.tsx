import { API_CARD_HEIGHT, API_CARD_WIDTH } from '@/constants/AppConstants'
import { getItemGridDimensions } from '@/helpers/util'
import { StyleSheet, ActivityIndicator, Pressable, Text, View, FlatList } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { hp } from '@/helpers/util'
import { YuGiOhUserCard } from '@/helpers/types'
import { router, useFocusEffect } from 'expo-router'
import { Image } from 'expo-image'
import React, { useCallback, useEffect, useState } from 'react'
import { AppConstants } from '@/constants/AppConstants'
import { supabase, supaFetchUserCards } from '@/lib/supabase'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import AppStyle from '@/constants/AppStyle'


const GRID_COLUMNS = 4
const GRID_PADDING = 10
const GRID_GAP = 20


const {width, height} = getItemGridDimensions(
    GRID_PADDING,
    GRID_GAP,
    GRID_COLUMNS,
    API_CARD_WIDTH,
    API_CARD_HEIGHT
)

const CollectionCard = ({card, index}: {card: YuGiOhUserCard, index: number}) => {
    const handlePress = () => {        
        router.push(
            {
                pathname: "/(pages)/cardPage",
                params: {
                    name: card.cards.name,
                    card_id: card.cards.card_id,
                    archetype: card.cards.archetype,
                    attribute: card.cards.attribute,
                    level: card.cards.level,
                    race: card.cards.race,
                    frametype: card.cards.frametype,
                        attack: card.cards.attack,
                    defence: card.cards.defence,
                    descr: card.cards.descr,
                    type: card.cards.type,
                    image_url: card.cards.image_url
                }
            }
        )
        }
    
      return (
        <Pressable onPress={handlePress}>
            <Image 
                source={card.cards.image_url} 
                style={{width: width, height: height, marginTop: index >= GRID_COLUMNS ? 10 : 0}}
            />
        </Pressable>
      )
}


const CardCollectionGrid = () => {    
    const [isLoading, setIsLoading] = useState(false)
    const [cards, setCards] = useState<YuGiOhUserCard[]>([])
    const loadingCards = isLoading && cards.length == 0

    let totalCards = 0
    cards.forEach(item => totalCards += item.total)

    const updatePage = async () => {
        const {data: {session}, error} = await supabase.auth.getSession()        
        if (session) {
            setIsLoading(true)        
            const {data, error: err} = await supaFetchUserCards(session)
            setCards([...data])
            setIsLoading(false)
        }        
    }

    
    useFocusEffect(
        useCallback(
            () => {
                updatePage()
            },
            []
        )
    )

    return (
        <View style={styles.container} >
            <View style={{width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}} >
                <Text style={AppStyle.textHeader}>Total: {totalCards}</Text>
                <Pressable onPress={() => router.navigate("/(tabs)/database")} hitSlop={AppConstants.hitSlopLarge} >
                    <Ionicons name='add-outline' size={30} color={Colors.orange} />
                </Pressable>
            </View>
            <View style={{width: '100%', flex: 1, height: hp(100)}} >
            {
                loadingCards ?
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}} >
                    <ActivityIndicator size={64} color={Colors.orange} />
                </View>
                :
                <FlashList
                    nestedScrollEnabled={true}
                    data={cards}            
                    keyExtractor={(item, index) => index.toString()}            
                    estimatedItemSize={height}
                    numColumns={GRID_COLUMNS}
                    renderItem={
                    ({item, index}) => <CollectionCard card={item} index={index} />
                    }
                />
            } 
            </View>
        </View>
    )
}

export default CardCollectionGrid

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%', 
        padding: 20, 
        backgroundColor: Colors.gray, 
        borderRadius: 4, 
        borderWidth: 1, 
        gap: 20,
        borderColor: Colors.orange
    }
})