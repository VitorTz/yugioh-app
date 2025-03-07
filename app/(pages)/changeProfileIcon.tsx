import { ActivityIndicator, Pressable, ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { AppConstants } from '@/constants/AppConstants'
import ProfileIcon from '@/components/ProfileIcon'
import { FlashList } from "@shopify/flash-list"
import { Session } from '@supabase/supabase-js'
import { useRoute } from '@react-navigation/native'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'
import PageActivityIndicator from '@/components/PageActivityIndicator'


var profileIcons: ImageDB[] = []

const ChangeProfileIcon = () => {
        
    const [session, setSession] = useState<Session | null>(null)
    const [saving, setSaving] = useState<boolean>(false)    
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useState<UserDB | null>(null)
    const [tempProfileIcon, setTempProfileIcon] = useState<ImageDB | null>(user ? user.image : null)    

    const initPage = async () => {    
        setLoading(true)
            const {data: {session}, error} = await supabase.auth.getSession()
            setSession(session)
            if (session) {
                const user = await supaFetchUser(session)
                setUser(user)
                setTempProfileIcon(user ? user.image : null)
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
        setSaving(true)
        if (session && tempProfileIcon) {
            const {data, error} = await supabase.from("users").update(
                {"image_id": tempProfileIcon.image_id}
            ).eq("user_id", session.user.id).select()
            if (error) {
                showToast("Error", error.message, "error")
                setSaving(false)
                return
            }            
            showToast("Success", "Profile icon changed", "success")            
        }
        setSaving(false)
    }

    const handleBack = () => {
        router.back()
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
            {
                loading ?
                <PageActivityIndicator/> :
                <>
                    <View style={{width: '100%', flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} >
                        {/* Save Button */}
                        {
                            saving ? 
                            <View style={AppStyle.iconButton} >
                                <ActivityIndicator color={AppConstants.icon.color} size={AppConstants.icon.size} />
                            </View>
                            :
                            <Pressable style={AppStyle.iconButton} onPress={handleSave} hitSlop={AppConstants.hitSlopLarge} >
                                <Ionicons name='checkmark-circle-outline' color={AppConstants.icon.color} size={AppConstants.icon.size}/>
                            </Pressable>
                        }
                        
                        
                        {/* Back Button */}
                        <Pressable style={AppStyle.iconButton} onPress={handleBack} hitSlop={AppConstants.hitSlopLarge}>
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
        borderWidth: 1,
        borderColor: Colors.white,
        borderCurve: "continuous"
    },
    listImage: {
        width: 96, 
        height: 96, 
        borderRadius: 96
    }    
})