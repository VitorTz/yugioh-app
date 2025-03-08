import { 
    FlatList, 
    KeyboardAvoidingView, 
    Pressable, 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    View 
} from 'react-native'
import { supaAddCardToCollection, supabase, supaRmvCardFromCollection } from '@/lib/supabase'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { TextInput } from 'react-native-gesture-handler'
import { AppConstants } from '@/constants/AppConstants'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import { showToast, wp } from '@/helpers/util'
import Toast from 'react-native-toast-message'
import { Ionicons } from '@expo/vector-icons'
import AppStyle from '@/constants/AppStyle'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { debounce } from 'lodash'
import {Image} from 'expo-image'
import NumericPicker from '@/components/NumericPicker';
import { sleep } from '@/helpers/sleep';
import ShareCardButton from '@/components/ShareCardButton';
import CopyStringButton from '@/components/CopyStringButton';


const CardInfo = ({value, title}: {value: any, title: string}) => {
    return (
        <>
            {
                value &&                 
                <View style={{marginRight: 10}} >
                    <Text style={AppStyle.textHeader} >{title}</Text>
                    <Text style={AppStyle.textRegular} >{value}</Text>
                </View>                
            }
        </>
    )
}


const CardPage = () => {

    const [totalInUserCollection, setTotalInUserCollection] = useState(0)    
    const card = useLocalSearchParams()    
    const card_id = card.card_id
    
    const card_info = [
        {value: card.attack, title: 'Attack'},
        {value: card.defence, title: 'Defence'},
        {value: card.level, title: 'Level'},
        {value: card.attribute, title: 'Attribute'},
        {value: card.archetype, title: 'Archetype'},
        {value: card.frametype, title: 'Frametype'},
        {value: card.race, title: 'Race'},
        {value: card.type, title: 'Type'}
    ]

    const updateTotalInUserCollection = async () => {
        const {data, error} = await supabase.from("user_cards").select("total").eq("card_id", card_id).single()
        data ? setTotalInUserCollection(data!.total) : setTotalInUserCollection(0)        
    }
    
    useEffect(
        useCallback(
            () => {
                updateTotalInUserCollection()
            },
            []
        )
    )

    const handleAddCardToCollection = async (input: string) => {
        if (input == '') {
            showToast("You are trying to add 0 cards to your collection", "", "error")
            return
        }        
        const {success, error} = await supaAddCardToCollection(card_id, parseInt(input))
        if (success) {
            showToast("Successs", '', "success")
        } else if (error) {
            console.log(error)
            switch (error.code) {                
                case "23503":
                    showToast("Error", "server error", "error")
                    break
                default:
                    showToast("Error", "", "error")
                    break
            }
        }
        await updateTotalInUserCollection()        
    }

    const handleRmvCardFromCollection = async (input: string) => {        
        if (input == '') {
            showToast("You are trying to rmv 0 cards to your collection", "", "error")
            return
        }        
        const {success, error} = await supaRmvCardFromCollection(card_id, parseInt(input))                
        if (success) {
            showToast("Successs", '', "success")
        } else if (error) {
            console.log(error)
            switch (error.code) {                
                case "23503":
                    showToast("Error", "server error", "error")
                    break
                default:
                    showToast("Error", "", "error")
                    break
            }
        }
        await updateTotalInUserCollection()        
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.background, paddingVertical: 10, paddingHorizontal: 20}} >
            <KeyboardAvoidingView>
                <ScrollView >                    
                    <View style={{width: '100%', paddingVertical: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} >
                        <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 20}} >
                            <ShareCardButton image_url={card.image_url} />
                            <CopyStringButton text={card.name} />
                        </View>
                        <Pressable onPress={() => router.back()}  hitSlop={AppConstants.hitSlopLarge} >
                            <Ionicons name='arrow-back-circle-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                        </Pressable>
                    </View>
                    <View style={styles.container}>
                        <Animated.View entering={FadeInUp.delay(50).duration(600)} style={{width: '100%', alignItems: "center", justifyContent: "center"}} >
                            <Image style={styles.image} source={card.image_url} />
                        </Animated.View>
                        {/* Card name */}                        
                        <View style={{width: '100%', marginVertical: 10, flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 10}} >  
                            <View style={{flex: 1, height: 2, backgroundColor: Colors.orange}} ></View>
                                <MaterialCommunityIcons name="cards" size={20} color={Colors.orange} />
                            <View style={{flex: 1, height: 2, backgroundColor: Colors.orange}} ></View>
                        </View>
                        <FlatList
                            data={card_info}
                            keyExtractor={(item) => item.title}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => <CardInfo title={item.title} value={item.value} />}
                        />
                        <Text style={AppStyle.textHeader} >Description</Text>
                        <Text style={AppStyle.textRegular} >{card.descr}</Text>
                        <View style={{flexDirection: 'row', gap: 4, alignItems: "baseline", justifyContent: "center"}} >
                            <Text style={AppStyle.textHeader} >Cards in collection:</Text>
                            <Text style={AppStyle.textRegular}>{totalInUserCollection}</Text>
                        </View>
                        <NumericPicker apply={handleAddCardToCollection} title='add' />
                        <NumericPicker apply={handleRmvCardFromCollection} title='remove' />                    
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Toast/>
        </SafeAreaView>
    )
}

export default CardPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        rowGap: 10,
        alignItems: "flex-start",
        justifyContent: "flex-start",        
        backgroundColor: Colors.gray,
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingBottom: 20,
        marginTop: 10,
        borderWidth: 1,
        borderColor: Colors.orange
    },
    image: {                 
        width: 320,
        height: 460,
        marginTop: 20        
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
    }
})