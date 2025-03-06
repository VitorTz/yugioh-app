import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {Image} from 'expo-image'
import AppStyle from '@/constants/AppStyle'
import { Colors } from '@/constants/Colors'
import { wp } from '@/helpers/util'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AppConstants, CARD_GRID_HEIGHT, CARD_GRID_WIDTH, DECK_GRID_HEIGHT, DECK_GRID_WIDTH } from '@/constants/AppConstants'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated'
import { YuGiOhCard, YuGiOhDeck } from '@/helpers/types'
import { supabase, supaFetchCardsFromDeck } from '@/lib/supabase'
import ImageGrid from '@/components/grid/ImageGrid'


const CardInfo = ({value, title}: {value: any, title: string}) => {
    return (
        <>
            {
                value &&                 
                <View style={{marginRight: 10}} >
                    <Text style={styles.header} >{title}</Text>
                    <Text style={styles.descr} >{value}</Text>
                </View>                
            }
        </>
    )
}

const DeckPage = () => {

    const [isLoading, setLoading] = useState(false);
    const [cards, setCards] = useState<YuGiOhCard[]>([])
    const deck = useLocalSearchParams()

    const fetch = async () => {        
        setLoading(true)        
        const data = await supaFetchCardsFromDeck(parseInt(deck.deck_id))
        setCards(data)                
        setLoading(false)
    }

    useEffect(
        () => {            
            fetch()
        },
        []
    )
    
    const card_info = [
        {
            title: "Name",
            value: deck.name
        },
        {
            title: "Archetypes",
            value: deck.archetypes
        },
        {
            title: "Attributes",
            value: deck.attributes
        },
        {
            title: "Frametypes",
            value: deck.frametypes
        },
    ]
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.background, padding: 10}} >
            <View style={styles.container} >
                <ImageGrid images={cards} columns={2} hasResult={true} isLoading={isLoading} onEndReached={() => {}} />
                <Animated.View entering={FadeInDown.delay(50).duration(600)} style={styles.descrContainer}  >
                    <Text style={[styles.header, {color: Colors.red}]} >{deck.name}</Text>
                    <View style={{width: '100%', marginVertical: 10, flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 10}} >  
                        <View style={{flex: 1, height: 2, backgroundColor: Colors.orange}} ></View>
                        <MaterialCommunityIcons name="layers-triple-outline" size={20} color={Colors.orange} />
                        <View style={{flex: 1, height: 2, backgroundColor: Colors.orange}} ></View>
                    </View>
                    <ScrollView>                        
                        {
                            card_info.map(
                                (item) => (<CardInfo key={item.title} value={item.value} title={item.title}/>)
                            )
                        }
                    </ScrollView>
                </Animated.View>
            </View>
            <Pressable onPress={() => router.back()} style={[AppStyle.iconButton, {position: 'absolute', right: 20, top: 10}]}  hitSlop={AppConstants.hitSlopLarge} >
                <Ionicons name='arrow-back-circle-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
            </Pressable>

        </SafeAreaView>
    )
}

export default DeckPage

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        width: '100%',
        gap: 20,
        marginTop: 20,
        alignItems: "center"        
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
    descrContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: Colors.gray,
        borderRadius: 4,
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.orange
    },
    descr: {        
        color: Colors.white,
        fontFamily: "LeagueSpartan_400Regular",
        fontSize: 16
    }
})