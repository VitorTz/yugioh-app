import { StyleSheet, SafeAreaView, Text, View, Pressable, Linking, ScrollView, ActivityIndicator } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import React, { useCallback, useEffect, useState } from 'react'
import { useGlobalState } from '@/context/GlobalContext'
import { router, useFocusEffect } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { supabase, supaFetchUser } from '@/lib/supabase'
import Toast from 'react-native-toast-message'
import { showToast } from '@/helpers/util'
import { sleep } from '@/helpers/sleep'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { AppConstants } from '@/constants/AppConstants'
import ProfileOption from '@/components/ProfileOption'
import PageActivityIndicator from '@/components/PageActivityIndicator'
import { ImageDB, UserDB } from '@/helpers/types'
import ProfileIcon from '@/components/ProfileIcon'
import { Session, User } from '@supabase/supabase-js'
import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks'
import { useRoute } from '@react-navigation/native'
import { Image } from 'expo-image'


interface OnPressMap {
  [key: string]: () => void
}

const Profile = () => {
  
  const [isLoading, setIsLoading] = useState(false)

  const initPage = async () => {
    setIsLoading(true)
    console.log("oi")
    const {data: {session}, error} = await supabase.auth.getSession()
    if (session == null) {
      await sleep(500)
      router.replace("/(auth)/signin")
    }
    setIsLoading(false)
    console.log("ois")
  }

  useEffect(
    () => {
      initPage()
    },
    []
  )  

  const handleLogout = async () => {
    const {error} = await supabase.auth.signOut()
    if (error) {
      showToast("Error", error.message, "error")
      return
    }    
    showToast("Success!", "Goodbye", "success")
    await sleep(1500)
    router.replace("/(auth)/signin")
  }

  const onPressMap: OnPressMap = {
    Profile: async () => router.navigate("/(pages)/changeProfileInfo"),
    Settings: async () => console.log("settings"),
    Github: async () => Linking.openURL(AppConstants.githubUrl),
    Logout: handleLogout
  }

  return (
    <SafeAreaView style={[AppStyle.safeArea, {justifyContent: "center"}]} >
      <View style={AppStyle.backdrop} >
        <ScrollView>
          <View style={styles.optionsView} >
            {
              AppConstants.profileOptions.map(
                (item, index) => {
                  return (
                    <ProfileOption 
                      key={item.title}
                      title={item.title} 
                      subtitle={item.subtitle}
                      iconName={item.iconName}
                      index={index}                      
                      onPress={onPressMap[item.title]}
                    />
                  )
                }
              )
            }
          </View>
        </ScrollView>

        {/* Profile icon and name */}
        <Animated.View entering={FadeInUp.delay(50).duration(700)}  style={{position: 'absolute', top: -60, alignItems: "center", justifyContent: "center"}} >  
          {/* Profile Icon */}          
          <View style={{marginTop: 20, marginBottom: 10}}>
            <ProfileIcon/>
          </View>
        </Animated.View>
      </View>
      <Toast/>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({  
  optionsView: {
    width: '100%', 
    gap: 30, 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 120, 
    paddingHorizontal: 10
  }
})