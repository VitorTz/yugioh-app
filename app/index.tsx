import { 
    ActivityIndicator, 
    Pressable, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View, 
    AppState 
} from 'react-native'
import AppStyle from '@/constants/AppStyle'
import { supabase, supaFetchUserProfileInfo } from '@/lib/supabase'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    useFonts,
    LeagueSpartan_100Thin,
    LeagueSpartan_200ExtraLight,
    LeagueSpartan_300Light,
    LeagueSpartan_400Regular,
    LeagueSpartan_500Medium,
    LeagueSpartan_600SemiBold,
    LeagueSpartan_700Bold,
    LeagueSpartan_800ExtraBold,
    LeagueSpartan_900Black,
} from '@expo-google-fonts/league-spartan';
import { useGlobalState } from '@/context/GlobalContext'
import { Colors } from '@/constants/Colors';
import { sleep } from '@/helpers/sleep'
import Toast from 'react-native-toast-message'
import { showToast } from '@/helpers/util'


AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})  
  

const index = () => {

    const {context, setContext} = useGlobalState()

    let [fontsLoaded] = useFonts({
        LeagueSpartan_100Thin,
        LeagueSpartan_200ExtraLight,
        LeagueSpartan_300Light,
        LeagueSpartan_400Regular,
        LeagueSpartan_500Medium,
        LeagueSpartan_600SemiBold,
        LeagueSpartan_700Bold,
        LeagueSpartan_800ExtraBold,
        LeagueSpartan_900Black,
    });


    const logoutUser = async () => {
        const {error} = await supabase.auth.signOut()
        setContext(null)
        router.replace("/(auth)/signin")
    } 

    const initApp = async () => {
        const {data: {session}} = await supabase.auth.getSession()
        if (session) {
            const { userInfo } = await supaFetchUserProfileInfo(session.user.id)
            if (userInfo == null) {
                showToast("Error", "could not retrive user profile info, login out", "error")
                await sleep(2000)
                logoutUser()
                return
            }            
            setContext(
                {
                    session: session,
                    user: session.user,
                    profileInfo: userInfo
                }
            )
            await sleep(200)
            router.replace("/(tabs)/database")
        } else {
            router.replace("/(auth)/signin")
        }
    }

    useEffect(
        () => {            
            if (fontsLoaded == true) {
                initApp()
            }
        },
        [fontsLoaded]
    )

    return (        
        <SafeAreaView style={AppStyle.safeArea} >
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}} >
                <ActivityIndicator size={64} color={Colors.orange} />
            </View>
            <Toast/>
        </SafeAreaView>        
    )
}

export default index

const styles = StyleSheet.create({})