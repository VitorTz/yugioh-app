import { ActivityIndicator, Pressable, ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AppStyle from '@/constants/AppStyle'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { ImageDB, UserDB } from '@/helpers/types'
import { supabase, supaFetchProfileIcons, supaFetchUser } from '@/lib/supabase'
import Toast from 'react-native-toast-message'
import { showToast } from '@/helpers/util'
import { router } from 'expo-router'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { ColumnItem } from '@/components/FlashListColumnItem'
import ProfileIcon from '@/components/ProfileIcon'
import { FlashList } from "@shopify/flash-list"
import PageActivityIndicator from '@/components/PageActivityIndicator'
import SaveButton from '@/components/SaveButton'
import BackButton from '@/components/BackButton'


var profileIcons: ImageDB[] = []

const ChangeProfileIcon = () => {
    
    const [loading, setLoading] = useState<boolean>(false)    
    const [tempProfileIcon, setTempProfileIcon] = useState<ImageDB | null>(null)


    const initPage = async () => {
        setLoading(true)
            const {data: {session}, error} = await supabase.auth.getSession()
            if (session) {
                const user = await supaFetchUser(session)
                if (user) {
                    setTempProfileIcon(user.image)
                }
            }
            if (profileIcons.length == 0) {
                profileIcons = await supaFetchProfileIcons()
            }
        setLoading(false)
    }

    useEffect(
        () => {
            initPage()            
        },
        []
    )

    const handleSave = async () => {
        const {data: {session}, error} = await supabase.auth.getSession()
        if (session && tempProfileIcon) {            
            const {data, error} = await supabase.from("users").update(
                {"image_id": tempProfileIcon.image_id}
            ).eq("user_id", session.user.id).select()
            if (error) {
                showToast("Error", error.message, "error")
                return
            }            
            showToast("Success", "Profile icon changed", "success")            
        }
    }

    const CardContent = ({item, index}: {item: ImageDB, index: number}) => {
        return (
            <Animated.View entering={FadeInDown.delay(index * 50).duration(600)} >
                <Pressable onPress={() => {setTempProfileIcon(item)} }>
                    <Image 
                        source={item.image_url} 
                        contentFit='cover' 
                        style={styles.listImage}/>
                </Pressable>
            </Animated.View>
        )
    }

    return (
        <SafeAreaView style={AppStyle.safeAreaLarge} >
            {
                loading ?
                <PageActivityIndicator/> :
                <>
                    <View style={{width: '100%', flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} >
                        <SaveButton save={handleSave} />
                        <BackButton/>
                    </View>

                    <View style={[AppStyle.backdrop, {marginTop: 30}]}>
                        <View style={{position: 'absolute', top: -50}} >
                            { 
                                tempProfileIcon &&
                                <Image source={tempProfileIcon.image_url} style={styles.image} />
                            }
                        </View>                
                        <View style={{height: '100%', width: '100%', paddingTop: 70}} >
                            <FlashList                                                
                                numColumns={3}
                                data={profileIcons}
                                renderItem={
                                    ({item, index}) => {
                                        return (
                                            <ColumnItem index={index} numColumns={3} >
                                                <CardContent item={item} index={index} />
                                            </ColumnItem>
                                        )
                                    }
                                }
                                keyExtractor={(item) => item.image_url}
                                estimatedItemSize={200}
                            />
                        </View>
                    </View>
                </>
            }

            <Toast/>
        </SafeAreaView>
    )
}

export default ChangeProfileIcon

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        borderRadius: 128,        
        borderCurve: "continuous"
    },
    listImage: {
        width: 96, 
        height: 96, 
        borderRadius: 96
    }    
})