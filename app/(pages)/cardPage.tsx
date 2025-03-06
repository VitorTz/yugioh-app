import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
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
import { supaAddCardToCollection } from '@/lib/supabase'

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

const CardPage = () => {
    const card = useLocalSearchParams()
    const [isAddingDeckToCollection, setIsAddingDeckToCollection] = useState(false)
    const [text, setText] = useState('')
    
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

    const handleAddDeckToCollection = async () => {
        if (text == '') {
            showToast("You are trying to add 0 cards to your collection", "", "error")
            return
        }
        setIsAddingDeckToCollection(true)
        const {success, error} = await supaAddCardToCollection(card.card_id, parseInt(text))
        if (success) {
            showToast("Successs", `Card ${card.name} x ${text} is add to your collecction`, "success")
        } else (
            showToast("Error", error!.message, "error")
        )
        setIsAddingDeckToCollection(false)
    }
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.background, padding: 20}} >
            <ScrollView >
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

                        <View style={{width: '100%', marginTop: 20, flexDirection: "row", gap: 20}} >
                            <TextInput 
                                keyboardType='numeric' 
                                value={text}
                                placeholder='0' 
                                placeholderTextColor={Colors.white} 
                                onChangeText={text => setText(text)}
                                maxLength={3}
                                style={{color: Colors.white, width: 100, padding: 20, backgroundColor: Colors.background, borderRadius: 4}} 
                            />
                            <Pressable 
                                onPress={handleAddDeckToCollection} 
                                hitSlop={AppConstants.hitSlop} 
                                style={{paddingHorizontal: 20, width: 160, borderRadius: 4, backgroundColor: Colors.orange, alignItems: "center", justifyContent: "center"}}>
                                    {
                                     isAddingDeckToCollection ?
                                        <ActivityIndicator size={AppConstants.icon.size} color={Colors.white}/> :
                                        <Text style={AppStyle.textRegular} >add to collection</Text>
                                    }
                            </Pressable>
                        </View>
                    
                    </Animated.View>
                </View>
            </ScrollView>            
            <Pressable onPress={() => router.back()} style={[AppStyle.iconButton, {position: 'absolute', right: 20, top: 10}]}  hitSlop={AppConstants.hitSlopLarge} >
                <Ionicons name='arrow-back-circle-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
            </Pressable>
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