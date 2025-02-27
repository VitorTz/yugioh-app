import { ActivityIndicator, Pressable, ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppStyle from '@/constants/AppStyle'
import { useGlobalState } from '@/context/GlobalContext'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { ProfilePhoto } from '@/helpers/types'
import { supabase } from '@/lib/supabase'
import Toast from 'react-native-toast-message'
import { showToast } from '@/helpers/util'
import { sleep } from '@/helpers/sleep'
import { router } from 'expo-router'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { AppConstants } from '@/constants/AppConstants'


const profilePhoto = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const {context, setContext} = useGlobalState()
    const [images, setImages] = useState<ProfilePhoto[]>([])
    const [profilePhoto, setProfilePhoto] = useState<ProfilePhoto | null>(null)

    const fetchImages = async () => {

        if (context) {
            setProfilePhoto(context.profileInfo.profilePhoto)
        }

        const {data, error} = await supabase.from("profile_icons").select("image_id, images (image_url)")
        if (error) {
            showToast("Error", "database has no profile icons", "error")
            await sleep(1000)
            return
        }
        let new_images: ProfilePhoto[] = []

        data.map(
            (item) => {
                new_images.push(
                    {
                        imageId: item.image_id,
                        imageUrl: item.images.image_url
                    }
                )
            }
        )
        setImages(new_images)

    }

    const handleImagePress = (item: ProfilePhoto) => {
        if (context) {            
            setContext(
                {
                    session: context.session,
                    user: context.user,
                    profileInfo: {
                        name: context.profileInfo.name,
                        profilePhoto: item
                    }
                }
            )
            setProfilePhoto(item)
        }
    }

    const handleSave = async () => {
        setLoading(true)
        if (context && profilePhoto) {                        
            const {data, error} = await supabase.from("users").update({"image_id": profilePhoto.imageId}).eq("user_id", context.user.id).select()
            if (error) {
                showToast("Error", error.message, "error")
            }
            if (data) {
                showToast("Success", "Profile icon changed", "success")
                setContext(
                    {
                        session: context.session,
                        user: context.user,
                        profileInfo: {
                            name: context.profileInfo.name,
                            profilePhoto: profilePhoto
                        }
                    }
                )            
            }
        }
        setLoading(false)
    }

    useEffect(
        () => {
            fetchImages()
        },
        []
    )

    return (
        <SafeAreaView style={AppStyle.safeAreaLarge} >
            <View style={{width: '100%', flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} >
                {
                    loading ? 
                    <View style={AppStyle.iconButton} >
                        <ActivityIndicator color={AppConstants.icon.color} size={AppConstants.icon.size} />
                    </View>
                    :
                    <Pressable style={AppStyle.iconButton} onPress={() => handleSave()} hitSlop={AppConstants.hitSlopLarge} >
                        <Ionicons name='checkmark-circle-outline' color={AppConstants.icon.color} size={AppConstants.icon.size}/>
                    </Pressable>
                }

                <Pressable style={AppStyle.iconButton} onPress={() => router.back()} hitSlop={AppConstants.hitSlopLarge}>
                    <Ionicons name='arrow-back-circle-outline' color={AppConstants.icon.color} size={AppConstants.icon.size} />
                </Pressable>

            </View>

            <View style={[AppStyle.backdrop, {marginTop: 30}]}>
                <Animated.View entering={FadeInUp.delay(400).duration(500)} >
                    {
                        profilePhoto ? 
                        <Image source={profilePhoto.imageUrl} style={styles.image} />
                        :
                        <Ionicons name='person-circle-outline' size={128} color={Colors.orange} />
                    }
                </Animated.View>

                <View style={{marginBottom: 40}}></View>

                <ScrollView>
                    <View style={styles.flexWrapContainer} >
                        {
                            images.map(
                                (item: ProfilePhoto, index: number) => {
                                    return (
                                        <Animated.View key={item.imageId} entering={FadeInDown.delay(index * 50)} >
                                            <Pressable onPress={() => handleImagePress(item)} >
                                                <Image source={item.imageUrl} contentFit="cover" style={styles.listImage} />
                                            </Pressable>
                                        </Animated.View>
                                    )
                                }
                            )
                        }
                    </View>
                </ScrollView>
            </View>

            <Toast/>
        </SafeAreaView>
    )
}

export default profilePhoto

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        borderRadius: 128        
    },
    listImage: {
        width: 60, 
        height: 60, 
        borderRadius: 60
    },
    flexWrapContainer: {
        width: '100%', 
        flexWrap: "wrap", 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "flex-start", 
        gap: 20, 
        paddingHorizontal: 10
    }
})