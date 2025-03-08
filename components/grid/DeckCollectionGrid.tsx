import { StyleSheet, ActivityIndicator, Pressable, Text, View } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';
import { FlashList } from '@shopify/flash-list'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { supabase, supaFetchUserDecks } from '@/lib/supabase'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import AppStyle from '@/constants/AppStyle'
import React, { useState } from 'react'
import { hp } from '@/helpers/util'
import { YuGiOhUserDeck } from '@/helpers/types'
import { getItemGridDimensions } from '@/helpers/util'
import { API_CARD_CROPPED_WIDTH, API_CARD_CROPPED_HEIGHT } from '@/constants/AppConstants'
import { AppConstants } from '@/constants/AppConstants'
import { Image } from 'expo-image'


const GRID_PADDING = 10
const GRID_GAP = 20
const GRID_COLUMNS = 1


const {width, height} = getItemGridDimensions(
    GRID_PADDING,
    GRID_GAP,
    GRID_COLUMNS,
    API_CARD_CROPPED_WIDTH,
    API_CARD_CROPPED_HEIGHT
)


const DeckItem = ({deck, index}: {deck: YuGiOhUserDeck, index: number}) => {
  const handlePress = () => {
      router.push({pathname: "/(pages)/deckPage", params: deck})
  }

  return (        
    <Pressable onPress={() => handlePress()} style={{marginTop: index >= GRID_COLUMNS ? 10 : 0}}>
        <Image contentFit='cover'  style={{width, height}} source={deck.image_url}/>
        <View style={{width: width, padding: 20, borderTopWidth: 2, borderColor: Colors.orange}} >
            <Text style={[AppStyle.textRegular, {color: Colors.orange}]}>{deck.name}</Text>
            <Text style={AppStyle.textRegular}>{deck.type}</Text>
            <Text style={AppStyle.textRegular}>{deck.num_cards} cards</Text>                
        </View>
    </Pressable>
  )
}


const DeckCollectionGrid = () => {

    const [decks, setDecks] = useState<YuGiOhUserDeck[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const loadingDecks = isLoading && decks.length == 0

    const totalDecksStr = decks.length > 0 ? `: ${decks.length}` : ''

    
    const updatePage = async () => {
        const {data: {session}, error} = await supabase.auth.getSession()        
        if (session) {
            setIsLoading(true)            
            const {data, error: err} = await supaFetchUserDecks(session)
            setDecks([...data])
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

    const handleCreateDeck = () => {
        router.navigate('/(pages)/createDeck')
    }

    return (
    <View style={styles.container} >
        <View style={{width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}} >
            <Text style={AppStyle.textHeader}>Decks{totalDecksStr}
            </Text>
            <View style={{flexDirection: 'row', gap: 10, alignItems: "center", justifyContent: "center"}} >
                <Pressable onPress={handleCreateDeck} hitSlop={AppConstants.hitSlop} >
                    <Ionicons name='create-outline' size={30} color={Colors.orange}/>
                </Pressable>
                <Pressable onPress={() => router.navigate("/(tabs)/database")} hitSlop={AppConstants.hitSlopLarge} >
                    <Ionicons name='add-outline' size={30} color={Colors.orange} />
                </Pressable>
            </View>
        </View>
        <View style={{width: '100%', height: hp(80)}} >
            {
                loadingDecks ?
                <View style={{flex: 1, alignItems: "center", justifyContent: "center"}} >
                    <ActivityIndicator size={64} color={Colors.orange} />
                </View>
                :
                <FlashList
                nestedScrollEnabled={true}
                data={decks}
                keyExtractor={(item, index) => index.toString()}
                estimatedItemSize={height}
                numColumns={GRID_COLUMNS}
                renderItem={
                    ({item, index}) => <DeckItem deck={item} index={index} />
                }
                />
            } 
        </View>
    </View>
    )
}

export default DeckCollectionGrid

const styles = StyleSheet.create({
    container: {
        width: '100%', 
        padding: 20, 
        backgroundColor: Colors.gray, 
        borderRadius: 4, 
        borderWidth: 1, 
        gap: 20,
        borderColor: Colors.orange
      }
})