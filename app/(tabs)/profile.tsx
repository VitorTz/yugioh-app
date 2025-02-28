import { StyleSheet, SafeAreaView, Text, View, Pressable, Linking, ScrollView, ActivityIndicator } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import React, { useEffect, useState } from 'react'
import { useGlobalState } from '@/context/GlobalContext'
import { router } from 'expo-router'
import { Image } from 'expo-image'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '@/lib/supabase'
import Toast from 'react-native-toast-message'
import { showToast } from '@/helpers/util'
import { sleep } from '@/helpers/sleep'
import Animated, { FadeInLeft, FadeInUp } from 'react-native-reanimated'
import { AppConstants } from '@/constants/AppConstants'
import ProfileOption from '@/components/ProfileOption'
import PageActivityIndicator from '@/components/PageActivityIndicator'


const Profile = () => {
  const {context, setContext} = useGlobalState()  
  const [waitingForSession, setWaitingForSession] = useState(true)  
  const username = context ? context.profileInfo.name : ""
  
  const ProfileIcon = () => {
    return (
      <>
      {        
        context ?
        <Image
          style={styles.image}
          source={context.profileInfo.profilePhoto.imageUrl}
          contentFit="cover"
        /> 
        :
        <Ionicons 
          size={128} 
          color={AppConstants.icon.color} 
          name='person-circle' 
        />
      }
      </>
    )
  }

  useEffect(
    () => {
      if (context == null) {
        router.replace("/(auth)/signin")
        setWaitingForSession(true)
      } else {        
        setWaitingForSession(false)
      }
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

  const onPressMap = {
    Profile: async () => router.navigate("/(pages)/profileInfo"),
    Settings: async () => console.log("settings"),
    Github: async () => Linking.openURL(AppConstants.githubUrl),
    Logout: handleLogout
  }

  const ProfilePage = () => {
    return (
      <View style={[AppStyle.backdrop]} >

        {/* Profile icon and name */}
        <Animated.View entering={FadeInUp.delay(50).duration(700)}  style={{alignItems: "center", justifyContent: "center"}} >  
          {/* Profile Icon */}
          <View style={{marginTop: 20, marginBottom: 10}}>              
            <ProfileIcon/>
            {/* Change profile icon button */}
            <Pressable onPress={() => router.navigate("/(pages)/profilePhoto")} style={styles.brush} >
              <Ionicons name='pencil-outline' size={20} color={AppConstants.icon.color} />
            </Pressable>
          </View> 

          {/* Profile Name */}
          <Text style={AppStyle.textUserName}>
            {username}
          </Text>
        </Animated.View>          
        
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
  image: {
    width: 128,
    height: 128,
    borderRadius: 128        
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
    right: 0,
    bottom: 0
  },
  optionsView: {
    width: '100%', 
    gap: 30, 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 20, 
    paddingHorizontal: 10
  }
})