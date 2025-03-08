import { supabase, supaFetchUser } from '@/lib/supabase'
import { AppConstants } from '@/constants/AppConstants'
import React, { useCallback, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import { router } from 'expo-router'
import {Image} from 'expo-image'
import { UserDB } from '@/helpers/types'



var lastImageUrl = ''

const ProfileIcon = () => {

    const [user, setUser] = useState<UserDB | null>(null)
    
    const update = async () => {
        const {data: {session}, error} = await supabase.auth.getSession()
        if (session) {
            const user = await supaFetchUser(session)
            lastImageUrl = user ? user.image.image_url : ''
            setUser(user)
        }
    }

    useFocusEffect(
        useCallback(
            () => {
                update()
            },
            []
        )
    )
    
    return (
        <>
            {        
                user && lastImageUrl != '' &&
                <View style={{alignItems: "center", gap: 10}}>
                    <View>
                        <Image
                        style={styles.image}
                        source={user.image.image_url}
                        contentFit="cover"/>
                        <Pressable onPress={() => router.push("/(pages)/changeProfileIcon")} style={styles.brush} hitSlop={AppConstants.hitSlopLarge} >
                            <Ionicons name='pencil-outline' size={20} color={Colors.white} />
                        </Pressable>
                    </View>
                    <Text style={AppStyle.textUserName}>{user ? user.name : ''}</Text>

                </View>
            }
        </>
    )
}

export default ProfileIcon

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: Colors.background
    },
    brush: {    
        position: 'absolute',
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        borderRadius: 32, 
        backgroundColor: Colors.background, 
        borderWidth: 1, 
        borderColor: Colors.white,
        bottom: 0,  
        right: 0
    }
})