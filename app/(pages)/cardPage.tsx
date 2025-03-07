import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useFocusEffect, useLocalSearchParams } from 'expo-router'
import { debounce } from 'lodash'
import React, { useCallback, useState } from 'react'
import {Image} from 'expo-image'
import AppStyle from '@/constants/AppStyle'
import { Colors } from '@/constants/Colors'
import { showToast, wp } from '@/helpers/util'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AppConstants } from '@/constants/AppConstants'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated'
import Toast from 'react-native-toast-message'
import { ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { supaAddCardToCollection, supabase, supaRmvCardFromCollection } from '@/lib/supabase'


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


const OrderPizza = () => {
    const initialValues = [{ id: "pizza", value: 3 }];
    const [pizzas, setPizzas] = useState(initialValues);
    const pizzaNumbers = [{ id: "pizza", label: "🍕", min: 0, max: 99 }];
   
    return (
      <View>
        <Text>I would like</Text>
        <NumberPlease
          digits={pizzaNumbers}
          values={pizzas}
          onChange={(values) => setPizzas(values)}
        />
      </View>
    );
  };

const CardPage = () => {

    const card = useLocalSearchParams()
    const [isAddingDeckToCollection, setIsAddingDeckToCollection] = useState(false)
    const [totalInUserCollection, setTotalInUserCollection] = useState(0)
    const [addCardsNum, setAddCardsNum] = useState('')
    const [rmvCardsNum, setRmvCardsNum] = useState('')
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

    const handleAddCardToCollection = async () => {
        if (addCardsNum == '') {
            showToast("You are trying to add 0 cards to your collection", "", "error")
            return
        }
        setIsAddingDeckToCollection(true)
        const {success, error} = await supaAddCardToCollection(card_id, parseInt(addCardsNum))
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
        setIsAddingDeckToCollection(false)
    }

    const debounceHandleAddCardToCollection = useCallback(
        debounce(handleAddCardToCollection, 400),
        [addCardsNum]
    )

    const handleRmvCardFromCollection = async () => {
        if (rmvCardsNum == '') {
            showToast("You are trying to rmv 0 cards to your collection", "", "error")
            return
        }
        setIsAddingDeckToCollection(true)
        const {success, error} = await supaRmvCardFromCollection(card_id, parseInt(rmvCardsNum))
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
        setIsAddingDeckToCollection(false)
    }

    const debounceHandleRmvCardFromCollection = useCallback(
        debounce(handleRmvCardFromCollection, 400),
        [rmvCardsNum]
    )
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.background, paddingVertical: 10, paddingHorizontal: 20}} >
            <ScrollView >
                <View style={{width: '100%', alignItems: "flex-end"}} >
                    <Pressable onPress={() => router.back()} style={AppStyle.iconButton}  hitSlop={AppConstants.hitSlopLarge} >
                        <Ionicons name='arrow-back-circle-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                    </Pressable>
                </View>
                <View style={styles.container} >
                    <Animated.View entering={FadeInUp.delay(50).duration(600)} >
                        <Image style={styles.image} source={card.image_url} />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(50).duration(600)} style={styles.descrContainer}  >
                        <Text style={[styles.header, {color: Colors.red}]} >{card.name}</Text>
                        <View style={{width: '100%', marginVertical: 10, flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 10}} >  
                            <View style={{flex: 1, height: 2, backgroundColor: Colors.orange}} ></View>
                            <MaterialCommunityIcons name="cards-outline" size={20} color={Colors.orange} />
                            <View style={{flex: 1, height: 2, backgroundColor: Colors.orange}} ></View>
                        </View>
                        <FlatList
                            data={card_info}
                            keyExtractor={(item) => item.title}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}) => <CardInfo title={item.title} value={item.value} />}
                        />
                        <Text style={styles.header} >Description</Text>
                        <Text style={styles.descr} >{card.descr}</Text>
                        <Text style={styles.header} >Cards in collection</Text>
                        <Text style={AppStyle.textRegular}>{totalInUserCollection}</Text>
                        <View style={{width: '100%', marginTop: 20, flexDirection: "row", gap: 10}} >
                            <TextInput 
                                keyboardType='numeric' 
                                value={addCardsNum}
                                placeholder='0' 
                                placeholderTextColor={Colors.white} 
                                onChangeText={text => setAddCardsNum(text)}
                                maxLength={3}
                                style={{color: Colors.white, width: 80, padding: 20, backgroundColor: Colors.background, borderRadius: 4}} 
                            />
                            <Pressable 
                                onPress={debounceHandleAddCardToCollection} 
                                hitSlop={AppConstants.hitSlop} 
                                style={{paddingHorizontal: 20, flex: 1, borderRadius: 4, backgroundColor: Colors.orange, alignItems: "center", justifyContent: "center"}}>
                                    {
                                     isAddingDeckToCollection ?
                                        <ActivityIndicator size={AppConstants.icon.size} color={Colors.white}/> :
                                        <Text style={AppStyle.textRegular} >add {addCardsNum} {addCardsNum > '1' ? "cards" : "card"} to collection</Text>
                                    }
                            </Pressable>
                        </View>
                        
                        <View style={{width: '100%', marginTop: 20, flexDirection: "row", gap: 10}} >
                            <TextInput 
                                keyboardType='numeric' 
                                value={rmvCardsNum}
                                placeholder='0' 
                                placeholderTextColor={Colors.white} 
                                onChangeText={text => setRmvCardsNum(text)}
                                maxLength={3}
                                style={{color: Colors.white, width: 80, padding: 20, backgroundColor: Colors.background, borderRadius: 4}} 
                            />
                            <Pressable 
                                onPress={debounceHandleRmvCardFromCollection} 
                                hitSlop={AppConstants.hitSlop} 
                                style={{paddingHorizontal: 20, flex: 1, borderRadius: 4, backgroundColor: Colors.orange, alignItems: "center", justifyContent: "center"}}>
                                    {
                                     isAddingDeckToCollection ?
                                        <ActivityIndicator size={AppConstants.icon.size} color={Colors.white}/> :
                                        <Text style={AppStyle.textRegular} >rmv {rmvCardsNum} {rmvCardsNum > '1' ? "cards" : "card"} from collection</Text>
                                    }
                            </Pressable>
                        </View>

                    </Animated.View>
                </View>
            </ScrollView>
            <Toast/>
        </SafeAreaView>
    )
}

export default CardPage

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        width: '100%',
        gap: 20,
        alignItems: "center"
    },
    image: {                 
        width: 320,
        height: 460,
        marginTop: 30
    },
    header: {
        fontSize: 22,        
        color: Colors.orange,
        fontFamily: "LeagueSpartan_600SemiBold"
    },
    descrContainer: {
        flex: 1,
        width: '100%',
        alignItems: "flex-start",
        justifyContent: "flex-start",        
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