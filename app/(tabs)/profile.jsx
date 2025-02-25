import { StyleSheet, Text, SafeAreaView, View, Pressable } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import CustomStatusBar from '@/components/CustomStatusBar'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { router } from 'expo-router'
import { supabase } from '../../context/supabase'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import { AppConstants } from '../../constants/AppConstants'
import { GlobalStateContext } from '../../context/GlobalStateContext'
import { useContext } from 'react'
import { openURL } from 'expo-linking'
import CustomToast from '../../components/CustomToast'
import { showToast } from '../../context/CustomToastConfig'
import { sleep } from '../../helpers/common'
import { Image } from 'expo-image'
import Animated, { FadeIn, FadeInLeft } from 'react-native-reanimated'


const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


const Profile = () => {
  const { user, setUser } = useContext(GlobalStateContext);  

  useFocusEffect(
    useCallback(
      () => {        
        if (user == null) {
          router.replace("(auth)/signin")
        }
        return () => {};
    }, [])
  );  

  const handleLogout = async () => {
    const { error } = supabase.auth.signOut()
    if (error) {
      showToast("Error!", error.message)
    } else {
      showToast("Goodbye 👋")
      await sleep(2000)
      router.replace("(auth)/signin")
    }
  }

  return (
    <SafeAreaView style={AppStyle.safeArea}>
      <CustomStatusBar></CustomStatusBar>
      <Animated.View entering={FadeInLeft.delay(50).duration(350)} style={{alignItems: "center", justifyContent: "center"}} >
        <View style={{borderRadius: 128}}>          
            {user ? 
              <Image 
              style={styles.image}
              source={user.image_url}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={0}/>  :
              <Ionicons name='person-circle' size={128} color={Colors.orange} />
          }
          
          <Pressable onPress={() => console.log("edit avatar")}  hitSlop={AppConstants.hitSlop} style={styles.editUserPhotoButton}>
            <Ionicons name='pencil-outline' color={Colors.orange} size={20} />
          </Pressable>

        </View>
        <Text style={{color: "white", fontSize: 20, fontWeight: "bold"}}>{user ? user.name : ""}</Text>
      </Animated.View>

      <View style={styles.options}>
        <Animated.View entering={FadeInLeft.delay(100).duration(350)} >
          <Pressable hitSlop={styles.customHitSlop} onPress={() => console.log("edit profile")} style={styles.optionItem}>
            <View style={{flexDirection: 'row', alignItems: "center", gap: 10}}>
              <Ionicons name='person-outline' color={Colors.orange} size={32} />
              <Text style={styles.optionText} >Your Profile</Text>
            </View>
            <Ionicons name='chevron-forward-outline' size={32} color={Colors.orange} />
          </Pressable>
        </Animated.View>
        
        <Animated.View entering={FadeInLeft.delay(150).duration(350)} >
          <Pressable hitSlop={styles.customHitSlop} onPress={() => console.log(user)} style={styles.optionItem}>
            <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 10}}>
              <Ionicons name='settings-outline' color={Colors.orange} size={32} />
              <Text style={styles.optionText} >Settings</Text>
            </View>
            <Ionicons name='chevron-forward-outline' size={32} color={Colors.orange} />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInLeft.delay(250).duration(350)} >
          <Pressable hitSlop={styles.customHitSlop} onPress={async () => await openURL("https://github.com/VitorTz/yugioh-app")} style={styles.optionItem}>
            <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 10}}>
              <Ionicons name='logo-github' color={Colors.orange} size={32} />
              <Text style={styles.optionText} >Github</Text>
            </View>
            <Ionicons name='chevron-forward-outline' size={32} color={Colors.orange} />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInLeft.delay(350).duration(350)} >
          <Pressable hitSlop={styles.customHitSlop} onPress={() => handleLogout()} style={styles.optionItem}>
            <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 10}}>
              <Ionicons name='log-in-outline' color={Colors.orange} size={32} />
              <Text style={styles.optionText} >Log out</Text>
            </View>
            <Ionicons name='chevron-forward-outline' size={32} color={Colors.orange} />
          </Pressable>
        </Animated.View>

        
      </View>

      <CustomToast/>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
  editUserPhotoButton: {
    position: 'absolute', 
    right: 10, 
    bottom: 0, 
    borderRadius: 64, 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 6, 
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.orange
  },
  options: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 40,
    gap: 20,    
    alignItems: "center",
    justifyContent: "center"
  },
  optionItem: {
    flexDirection: "row", 
    width: '100%', 
    justifyContent: "space-between", 
    alignItems: "center"
  },
  optionText: {
    fontSize: 16,
    color: Colors.white
  },
  customHitSlop: {
    top: 10, 
    bottom: 10, 
    right: 20, 
    left: 20
  },
  image: {    
    width: 128,
    height: 128,
    borderRadius: 128,
    borderWidth: 1,
    borderColor: Colors.orange,
    backgroundColor: Colors.background,
  }
})