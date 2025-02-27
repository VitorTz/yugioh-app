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
import { GlobalStateProvider, useGlobalState } from '@/context/GlobalContext'
import { Colors } from '@/constants/Colors';


// if the user's session is terminated. This should only be registered once.
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

    const initApp = async () => {
        const {data: {session}} = await supabase.auth.getSession()
        if (session) {
            context.session = session
            context.user = session.user
            const {userInfo: userInfo } = await supaFetchUserProfileInfo(session.user.id)
            context.profileInfo = userInfo
            setContext(context)
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
                <ActivityIndicator size={96} color={Colors.orange} />
            </View>        
        </SafeAreaView>        
    )
}

export default index

const styles = StyleSheet.create({})