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
import ProfileIcon from '@/components/ProfileIcon'
import { FlatList } from 'react-native-reanimated/lib/typescript/Animated'


const profilePhoto = () => {

    const {context, setContext} = useGlobalState()        
    const [loading, setLoading] = useState<boolean>(false)    
    const [tempProfileIcon, setTempProfileIcon] = useState<ImageDB | undefined>(context?.user.image)    

    const handleSave = async () => {
        setLoading(true)
        if (context && tempProfileIcon) {
            const {data, error} = await supabase.from("users").update(
                {"image_id": tempProfileIcon.image_id}
            ).eq("user_id", context.user.user_id).select()
            if (error) {
                showToast("Error", error.message, "error")
                setLoading(false)
                return
            }            
            showToast("Success", "Profile icon changed", "success")                
            context.user.image = tempProfileIcon            
            setContext(
                {
                    session: context.session,
                    user: context.user,                    
                    profileIcons: context.profileIcons
                }
            )

        }
        setLoading(false)
    }

    const CardContent = ({item, index}: {item: ImageDB, index: number}) => {
        return (
            <Animated.View entering={FadeInDown.delay(index * 50).duration(600)} >
                <Pressable onPress={() => setTempProfileIcon(item) }>
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
                <View style={{position: 'absolute', top: -50}} >
                    <ProfileIcon image={tempProfileIcon} accentColor={Colors.background} />
                </View>                
                <View style={{height: '100%', width: '100%', paddingTop: 70}} >
                    <FlashList                                                
                        numColumns={3}
                        data={context ? context.profileIcons :  []}
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

            <Toast/>
        </SafeAreaView>
    )
}

export default profilePhoto

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        borderRadius: 128,
        borderWidth: 1,
        borderColor: Colors.white,
        borderCurve: "continuous"
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