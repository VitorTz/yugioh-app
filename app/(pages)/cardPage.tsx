import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import {Image} from 'expo-image'
import AppStyle from '@/constants/AppStyle'
import { Colors } from '@/constants/Colors'
import { wp } from '@/helpers/util'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AppConstants } from '@/constants/AppConstants'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated'

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
    
    const card_info = [
        {
            value: card.attack,
            title: 'Attack'
        },
        {
            value: card.defence,
            title: 'Defence'
        },
        {
            value: card.level,
            title: 'Level'
        },
        {
            value: card.attribute,
            title: 'Attribute'
        },
        {
            value: card.archetype,
            title: 'Archetype'
        },
        {
            value: card.frametype,
            title: 'Frametype'
        },
        {
            value: card.race,
            title: 'Race'
        },
        {
            value: card.type,
            title: 'Type'
        }      
    ]
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.background, padding: 20}} >
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
                    <ScrollView>
                        <FlatList
                            data={card_info}
                            keyExtractor={item => item.title}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={
                                ({item}) => {
                                    return (
                                        <CardInfo value={item.value} title={item.title}/>
                                    )
                                }
                            }/>
                        <Text style={styles.header} >Description</Text>
                        <Text style={styles.descr} >{card.descr}</Text>
                    </ScrollView>
                </Animated.View>
            </View>
            <Pressable onPress={() => router.back()} style={[AppStyle.iconButton, {position: 'absolute', right: 20, top: 10}]}  hitSlop={AppConstants.hitSlopLarge} >
                <Ionicons name='arrow-back-circle-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
            </Pressable>

        </SafeAreaView>
    )
}

export default CardPage

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