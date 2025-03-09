import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import AppStyle from '@/constants/AppStyle'
import { debounce } from 'lodash'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { AppConstants } from '@/constants/AppConstants'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { YuGiOhCard } from '@/helpers/types'
import { supaAddDeckToUser, supaFetchCardsFromDeck, supaGetUseMissingCardInDeck, supaRmvDeckFromUser, supaUserHasDeck } from '@/lib/supabase'
import Toast from 'react-native-toast-message'
import { getImageHeight, getImageHeightCropped, hp, showToast, wp } from '@/helpers/util'
import ImageCard from '@/components/grid/ImageCard'
import ImageGrid from '@/components/grid/ImageGrid'
import { Image } from 'expo-image'



const DeckInfo = ({value, title}: {value: any, title: string}) => {
    return (
        <>
            {
                value &&                 
                <View style={{marginRight: 10}} >
                    <Text style={styles.header} >{title}</Text>
                    <Text textBreakStrategy='simple' style={styles.descr} >{value}</Text>
                </View>                
            }
        </>
    )
}

const DeckPage = () => {

    const [isLoading, setLoading] = useState(false);    
    const [userHasDeckInCollection, setUserHasDeckInCollection] = useState(false)
    const [cards, setCards] = useState<YuGiOhCard[]>([])
    const [missingCards, setMissingCards] = useState<{card_id: string, name: string}[]>([])
    const deck = useLocalSearchParams()
    const deck_id = parseInt(deck.deck_id)    

    const initPage = async () => {
        setLoading(true)
            const data = await supaFetchCardsFromDeck(deck_id)
            setCards(data)

            const {result, error} = await supaUserHasDeck(deck_id)
            setUserHasDeckInCollection(result)
        setLoading(false)        
    }

    useEffect(
        () => {initPage()},
        []
    )
    
    const checkForMissingCards = async () => {
        const {cards: missCards, error: err} = await supaGetUseMissingCardInDeck(deck_id)
        setMissingCards(missCards)
    }

    const debounceCheckForMissingCards = useCallback(
          debounce(checkForMissingCards, 500),
          []
      )

    useFocusEffect(
        useCallback(
            () => {                
                debounceCheckForMissingCards()
            },
            []
        )
    )
    
    let card_info = [
        {title: "Archetypes", value: deck.archetypes},
        {title: "Attributes", value: deck.attributes},
        {title: "Frametypes", value: deck.frametypes},
        {title: "Races", value: deck.races},
        {title: "Types", value: deck.types},
        {title: "Deck Type", value: deck.type},
        {title: "Cards", value: `Total: ${deck.num_cards}`},
    ]

    const handleAddDeckToCollection = async () => {        
        const {success, error} = await supaAddDeckToUser(deck_id)        
        if (success) {
            showToast("Success", `Deck ${deck.name} add to your collection`, "success")            
            setUserHasDeckInCollection(true)
        } else {
            switch (error?.code) {
                case "23505":
                    showToast("Deck already in your collection", "", "success")
                default:
                    break
            }            
        }        
    }

    const handleRemoveDeckFromCollection = async () => {        
        const {success, error} = await supaRmvDeckFromUser(deck_id)
        if (success) {
            showToast("Success!", "deck removed from your collection!", "success")
            setUserHasDeckInCollection(false)
        } else {
            showToast("Error", error!.message, "error")
        }        
    }

    const handleAddRmvDeck = async () => {
        setLoading(true)
        if (userHasDeckInCollection) {
            await handleRemoveDeckFromCollection()
        } else {
            await handleAddDeckToCollection()
        }
        setLoading(false)
    } 

    return (
        <SafeAreaView style={styles.safeArea} >
            <ScrollView>
                {/* Back Button */}
                <View style={styles.returnButton} >
                    <Pressable onPress={() => router.back()} hitSlop={AppConstants.hitSlopLarge} >
                        <Ionicons name='arrow-back-circle-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                    </Pressable>
                </View>
                
                <View style={styles.container}>
                    <Animated.View entering={FadeInUp.delay(50).duration(600)} style={{width: '100%', alignItems: "center", justifyContent: "center"}} >
                        <Image source={deck.image_url} style={{width: 300, height: getImageHeightCropped(300), marginTop: 20}} />
                    </Animated.View>
                    <View style={{width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 10}} >  
                        <View style={{flex: 1, height: 2, backgroundColor: Colors.orange}} ></View>
                        <Ionicons name="layers-outline" size={20} color={Colors.orange} />
                        <View style={{flex: 1, height: 2, backgroundColor: Colors.orange}} ></View>
                    </View>
                    {/* Deck Name */}
                    <Text style={[styles.header, {color: Colors.white}]} >{deck.name}</Text>

                    {
                        deck.descr &&
                        <>
                            <Text style={styles.header}>Description</Text>
                            <ScrollView style={{width: '100%', maxHeight: hp(20)}} nestedScrollEnabled={true} >
                                <Text style={styles.descr}>{deck.descr}</Text>
                            </ScrollView>
                        </>
                    }
                    
                    {/* Deck info */}
                    {card_info.map((item) => (<DeckInfo key={item.title} value={item.value} title={item.title}/>))}
                    
                    {/* Missing Cards */}
                    <View>
                        {
                            missingCards.length > 0 && 
                            <>
                                <Text style={AppStyle.textHeader}>Cards you don't have</Text>
                                {
                                    missingCards.map(
                                        (item, index) => <View key={index}><Text style={AppStyle.textRegular}>{item.name}</Text></View>
                                    )
                                }
                            </>
                        }
                    </View>
                    
                    {/* Add or remove from deck collection */}
                    <Pressable onPress={handleAddRmvDeck} style={{paddingHorizontal: 20, height: 50, backgroundColor: Colors.orange, alignItems: "center", justifyContent: "center", borderRadius: 4, marginTop: 10}} >
                        {
                            isLoading ?
                            <ActivityIndicator size={AppConstants.icon.size} color={Colors.white} /> :
                            <Text style={AppStyle.textRegular} >
                                    {userHasDeckInCollection ? "Remove deck from collection" : "Add deck to collection"}
                            </Text>
                        }
                    </Pressable>
                </View>
                <ImageGrid columns={3} hasResult={true} isLoading={isLoading} images={cards} onEndReached={() => {}} />                
            </ScrollView>
            <Toast/>
        </SafeAreaView>
    )
}

export default DeckPage

const styles = StyleSheet.create({
    safeArea: {
        flex: 1, 
        backgroundColor: Colors.background, 
        padding: wp(4)
    },
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: Colors.gray,
        borderRadius: 4,
        gap: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.orange,
        marginVertical: 20        
    },
    returnButton: {
        width: '100%', 
        alignItems: "center", 
        justifyContent: "flex-end", 
        flexDirection: "row"
    },
    image: {                 
        width: 320,
        height: 460
    },
    header: {
        fontSize: 22,        
        color: Colors.orange,
        fontFamily: "LeagueSpartan_600SemiBold"
    },    
    descr: {        
        color: Colors.white,
        fontFamily: "LeagueSpartan_400Regular",
        fontSize: 16
    },
    deckCardsContainer: {
        width: '100%', 
        gap: wp(2), 
        flexDirection: "row", 
        flexWrap: 'wrap', 
        justifyContent: "center"
    }
})