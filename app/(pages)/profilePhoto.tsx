import { ActivityIndicator, Pressable, ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppStyle from '@/constants/AppStyle'
import { useGlobalState } from '@/context/GlobalContext'
import { Image } from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { ImageDB } from '@/helpers/types'
import { supabase } from '@/lib/supabase'
import Toast from 'react-native-toast-message'
import { showToast } from '@/helpers/util'
import { router } from 'expo-router'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated'
import { AppConstants } from '@/constants/AppConstants'
import { FlashList } from "@shopify/flash-list"
import { ColumnItem } from '@/components/FlashListColumnItem'


const profilePhoto = () => {

    const {context, setContext} = useGlobalState()        
    const [loading, setLoading] = useState<boolean>(false)
    const [tempProfileIcon, setTempProfileIcon] = useState<ImageDB | null>(
        context ? context.profileInfo.profilePhoto : null
    )     

    const handleSave = async () => {
        setLoading(true)
        if (context && tempProfileIcon) {                        
            const {data, error} = await supabase.from("users").update({"image_id": tempProfileIcon.imageId}).eq("user_id", context.user.id).select()
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
                            profilePhoto: tempProfileIcon
                        },
                        allProfileIcons: context.allProfileIcons
                    }
                )            
            }
        }
        setLoading(false)
    }

    const CardContent = ({item, index}: {item: ImageDB, index: number}) => {
        return (
            <Animated.View entering={FadeInDown.delay(index * 50).duration(600)} >
                <Pressable onPress={() => setTempProfileIcon(item) }>
                    <Image 
                        source={item.imageUrl} 
                        contentFit='cover' 
                        style={styles.listImage}/>
                </Pressable>
            </Animated.View>
        )
    }

    return (
        <SafeAreaView style={AppStyle.safeAreaLarge} >
            <View style={{width: '100%', flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} >
                {/* Save Button */}
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
                
                
                {/* Back Button */}
                <Pressable style={AppStyle.iconButton} onPress={() => router.back()} hitSlop={AppConstants.hitSlopLarge}>
                    <Ionicons name='arrow-back-circle-outline' color={AppConstants.icon.color} size={AppConstants.icon.size} />
                </Pressable>

            </View>

            <View style={[AppStyle.backdrop, {marginTop: 30}]}>
                <Animated.View entering={FadeInUp.delay(400).duration(500)} style={{marginBottom: 40}} >
                    {
                        tempProfileIcon ? 
                        <Image source={tempProfileIcon.imageUrl} style={styles.image} />
                        :
                        <Ionicons name='person-circle-outline' size={128} color={Colors.orange} />
                    }
                </Animated.View>                
                <View style={{height: 200, width: '100%'}} >
                    <FlashList                                                
                        numColumns={3}
                        data={context ? context.allProfileIcons :  []}
                        renderItem={
                            ({item, index}) => {
                                return (
                                    <ColumnItem index={index} numColumns={3} >
                                        <CardContent item={item} index={index} />
                                    </ColumnItem>
                                )
                            }
                        }
                        keyExtractor={(item) => item.imageUrl}
                        estimatedItemSize={200}
                    />
                </View>
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
        width: 96, 
        height: 96, 
        borderRadius: 96
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