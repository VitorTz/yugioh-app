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


interface OnPressMap {
  [key: string]: () => void
}

const Profile = () => {  
  
  const [waitingForSession, setWaitingForSession] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<UserDB | null>(null)  
  const username = user ? user.name : ""

  const initPage = async () => {
    const {data: {session}, error} = await supabase.auth.getSession()
    if (!session) {
      setWaitingForSession(true)
      setSession(null)
      setUser(null)
      await sleep(500)
      router.replace("/(auth)/signin")
    } else {
      const user = await supaFetchUser(session)
      setSession(session)
      setUser(user)      
      setWaitingForSession(false)
    }
  }
  
  useEffect(
    () => {      
      initPage()
      console.log("oi")
    },
    []
  )

  useFocusEffect(
    () => {
      const r = useLocalSearchParams()
      console.log(r)
    }
  )

  const handleLogout = async () => {
    const {error} = await supabase.auth.signOut()
    if (error) {
      showToast("Error", error.message, "error")
      return
    }
    setSession(null)
    setUser(null)
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
  
  const ProfilePage = () => {
    return (
      <View style={[AppStyle.backdrop]} >
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
            {
              user ? 
              <ProfileIcon image={user.image} accentColor={Colors.background} /> :
              <Ionicons size={128} color={Colors.orange} />
            }
            {/* Change profile icon button */}
            <Pressable onPress={() => router.push("/(pages)/changeProfileIcon")} style={styles.brush} hitSlop={AppConstants.hitSlopLarge} >
              <Ionicons name='pencil-outline' size={20} color={Colors.white} />
            </Pressable>
          </View> 

          {/* Profile Name */}
          <Text style={AppStyle.textUserName}>{username}</Text>
        </Animated.View>

      </View>
    )
  }

  return (
    <SafeAreaView style={[AppStyle.safeArea, {justifyContent: "center"}]} >
      {waitingForSession ? <PageActivityIndicator/> : <ProfilePage/>}
      <Toast/>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({  
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
  },
  optionsView: {
    width: '100%', 
    gap: 30, 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 120, 
    paddingHorizontal: 10
  }
})