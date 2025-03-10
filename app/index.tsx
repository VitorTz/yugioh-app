import {     
    SafeAreaView, 
    StyleSheet,     
    AppState 
} from 'react-native'
import AppStyle from '@/constants/AppStyle'
import { supabase } from '@/lib/supabase'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
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
import PageActivityIndicator from '@/components/PageActivityIndicator'


AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})  
  

const index = () => {

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
            <PageActivityIndicator/>            
        </SafeAreaView>        
    )
}

export default index

const styles = StyleSheet.create({})