import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import CustomStatusBar from '@/components/CustomStatusBar'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { router } from 'expo-router'
import { fetchUser, fetchUserName, supabase } from '../../context/supabase'

const Profile = () => {

  const [userStateChanged, setUserStateChanged] = useState(false)
  const [user, setUser] = useState({name: "qweq"})
  
  useFocusEffect(
    useCallback(
      () => {
        if (supabase.auth.getSession() == null) {          
          router.navigate("(auth)/signin")        
        }
        return () => {

        };
    }, [])
  );

  const initUser = async () => {
    const user = await fetchUser()
    setUser(user)
  }

  useEffect(
    () => {
      initUser()
    },
    [userStateChanged]
  )


  return (
    <SafeAreaView style={AppStyle.safeArea}>
      <CustomStatusBar></CustomStatusBar>      
      <Text style={{color: "white"}}>{user.name}</Text>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})