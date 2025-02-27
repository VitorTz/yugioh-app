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
import { ProfilePhoto } from '@/helpers/types'
import Animated, { FadeInLeft, FadeInUp } from 'react-native-reanimated'
import { AppConstants } from '@/constants/AppConstants'


interface ProfileIconProps {
  title: string
  subtitle: string | null
  iconName: string
  onPress: () => void
  index: number
}


const PROFILE_ICONS = [
  {
    title: "Profile",
    subtitle: "name, email, password",
    iconName: "person-outline"
  },
  {
    title: "Settings",
    subtitle: "color theme",
    iconName: "settings-outline"
  },
  {
    title: "Github",
    subtitle: "source code",
    iconName: "logo-github"
  },
  {
    title: "Logout",
    subtitle: null,
    iconName: "log-out-outline"
  }
]

const profileOption = ({
  title, 
  subtitle, 
  iconName,
  onPress,
  index
}: ProfileIconProps) => {
  return (
    <Animated.View entering={FadeInLeft.delay(index * 50).duration(1000)} >
      <Pressable style={styles.profileOption} onPress={onPress} >
        <View style={{flexDirection: "row", gap: 20, alignItems: "center"}} >
          <Ionicons name={iconName} size={AppConstants.icon.size} color={AppConstants.icon.color} />
          <View>
            <Text style={styles.profileOptionText} >{title}</Text>
            {
              subtitle && 
              <Text style={styles.profileOptionTextDesc} >{subtitle}</Text>
            }            
          </View>
        </View>
        <Pressable>
          <Ionicons name='chevron-forward-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
        </Pressable>                  
      </Pressable>
    </Animated.View>
  )
}

const Profile = () => {
  const {context, setContext} = useGlobalState()
  const [isLoading, setLoading] = useState(false)
  const [waitingForSession, setWaitingForSession] = useState(true)
  const profileImageUrl = context?.profileInfo.profilePhoto.imageUrl

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

  const handleGithub = async () => {    
    await Linking.openURL("https://github.com/VitorTz/yugioh-app")    
  }

  const handleLogout = async () => {
    setLoading(true)
    const {error} = await supabase.auth.signOut()
    setLoading(false)
    if (error) {
      showToast("Error", error.message, "error")
      return
    }
    showToast("Success!", "Goodbye", "success")
    await sleep(2000)
    setContext(null)    
  }

  return (
    <SafeAreaView style={[AppStyle.safeArea, {justifyContent: "center"}]} >
      {
        
        waitingForSession ?
        <View style={{alignItems: "center", justifyContent: "center", flex: 1}} >
          <ActivityIndicator size={64} color={Colors.orange} /> 
        </View>

        :

        <View style={[AppStyle.backdrop]} >          
          
          <Animated.View entering={FadeInUp.delay(200).duration(500)}  style={{alignItems: "center", justifyContent: "center"}} >  
            <View style={{marginTop: 20, marginBottom: 10}}>
              
              {/* User profile icon */}
              {
                context ?
                <Image
                  style={styles.image}
                  source={context.profileInfo.profilePhoto.imageUrl}
                  contentFit="cover"
                /> :
                <Ionicons size={128} color={Colors.white} name='person-circle' />
              }

              {/* Change profile icon button */}
              <Pressable onPress={() => router.navigate("/(pages)/profilePhoto")} style={styles.brush} >
                <Ionicons name='pencil-outline' size={20} color={Colors.orange} />
              </Pressable>
            </View> 

            {/* Profile Name */}
            <Text style={{color: Colors.orange, fontFamily: "LeagueSpartan_400Regular", fontSize: 18}}>
              {context ? context.profileInfo.name : "" }
            </Text>
          </Animated.View>          
          
          <ScrollView>
            <View style={{width: '100%', gap: 30, alignItems: "center", justifyContent: "center", marginTop: 20, paddingHorizontal: 10}} >
              
              {/* ProfileInfo button */}
              <Animated.View entering={FadeInLeft.delay(50).duration(400)} >
                <Pressable style={styles.profileOption} onPress={() => router.navigate("/(pages)/profileInfo")} >
                  <View style={{flexDirection: "row", gap: 20, alignItems: "center"}} >
                    <Ionicons name='person-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                    <View>
                      <Text style={styles.profileOptionText} >Profile</Text>
                      <Text style={styles.profileOptionTextDesc} >name, email, password</Text>
                    </View>
                  </View>
                  <Pressable>
                    <Ionicons name='chevron-forward-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                  </Pressable>
                </Pressable>
              </Animated.View>
              
              <Animated.View entering={FadeInLeft.delay(100).duration(400)} >
                <Pressable style={styles.profileOption} >
                  <View style={{flexDirection: "row", gap: 20, alignItems: "center"}} >
                    <Ionicons name='settings-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                    <View>
                      <Text style={styles.profileOptionText} >Settings</Text>
                      <Text style={styles.profileOptionTextDesc} >color theme</Text>
                    </View>
                  </View>
                  <Pressable>
                    <Ionicons name='chevron-forward-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                  </Pressable>
                </Pressable>
              </Animated.View>
              
              {/* Github button */}
              <Animated.View entering={FadeInLeft.delay(150).duration(400)} >
                <Pressable style={styles.profileOption} onPress={() => handleGithub()} >
                  <View style={{flexDirection: "row", gap: 20, alignItems: "center"}} >
                    <Ionicons name='logo-github' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                    <View>
                      <Text style={styles.profileOptionText} >Github</Text>
                      <Text style={styles.profileOptionTextDesc} >source code</Text>
                    </View>
                  </View>
                  <Pressable>
                    <Ionicons name='chevron-forward-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                  </Pressable>                  
                </Pressable>
              </Animated.View>

              <Animated.View entering={FadeInLeft.delay(200).duration(400)} >
                <Pressable style={styles.profileOption} onPress={() => handleLogout()} >
                  <View style={{flexDirection: "row", gap: 20, alignItems: "center"}} >
                    <Ionicons name='log-out-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                    <Text style={styles.profileOptionText} >Logout</Text>
                  </View>
                  {
                    isLoading ?
                    <ActivityIndicator size={AppConstants.icon.size} color={AppConstants.icon.color} /> :
                    <Pressable>
                      <Ionicons name='chevron-forward-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                    </Pressable>
                  }
                </Pressable>
              </Animated.View>

            </View>
          </ScrollView>
        </View>
      }
    <Toast/>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  image: {
    width: 128,
    height: 128,
    borderRadius: 128,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.red
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
    borderColor: Colors.orange,
    right: 0,
    bottom: 0
  },
  profileOption: {
    width: '100%', 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between"
  },
  profileOptionText: {
    color: Colors.orange, 
    fontSize: 20, 
    fontFamily: "LeagueSpartan_400Regular"
  },
  profileOptionTextDesc: {
    color: Colors.orange, 
    fontSize: 14, 
    fontFamily: "LeagueSpartan_400Regular"
  }
})