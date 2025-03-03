import { StyleSheet, SafeAreaView, Text, View, Pressable, Linking, ScrollView, ActivityIndicator } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import React, { useEffect, useState } from 'react'
import { useGlobalState } from '@/context/GlobalContext'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '@/lib/supabase'
import Toast from 'react-native-toast-message'
import { showToast } from '@/helpers/util'
import { sleep } from '@/helpers/sleep'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { AppConstants } from '@/constants/AppConstants'
import ProfileOption from '@/components/ProfileOption'
import PageActivityIndicator from '@/components/PageActivityIndicator'
import { ImageDB } from '@/helpers/types'
import ProfileIcon from '@/components/ProfileIcon'


interface OnPressMap {
  [key: string]: () => void
}

const Profile = () => {
  const {context, setContext} = useGlobalState()  
  const [waitingForSession, setWaitingForSession] = useState(true)  
  const username: string | undefined = context?.user.name
  const userImage: ImageDB | undefined = context?.user.image  

  const initPage = async () => {
    if (context == null) {        
      await sleep(500)
      router.replace("/(auth)/signin")
      setWaitingForSession(true)
    } else {        
      setWaitingForSession(false)
    }
  }
  
  useEffect(
    () => {      
      initPage()
    },
    [context]
  )  

  const handleLogout = async () => {
    const {error} = await supabase.auth.signOut()    
    if (error) {
      showToast("Error", error.message, "error")
      return
    }
    showToast("Success!", "Goodbye", "success")
    await sleep(2000)
    setContext(null)
  }

  const onPressMap: OnPressMap = {
    Profile: async () => router.navigate("/(pages)/profileInfo"),
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
            <ProfileIcon image={userImage} accentColor={Colors.background} />
            {/* Change profile icon button */}
            <Pressable onPress={() => router.navigate("/(pages)/profilePhoto")} style={styles.brush} hitSlop={AppConstants.hitSlopLarge} >
              <Ionicons name='pencil-outline' size={20} color={"white"} />
            </Pressable>
          </View> 

          {/* Profile Name */}
          <Text style={AppStyle.textUserName}>
            {username}
          </Text>
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