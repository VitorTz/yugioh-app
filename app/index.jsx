import React from 'react'
import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import { fetchUser, supabase } from '../context/supabase'
import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import AppStyle from '../constants/AppStyle'
import { router } from 'expo-router'
import CustomStatusBar from '../components/CustomStatusBar'
import { AppState } from 'react-native'
import { GlobalStateContext } from '../context/GlobalStateContext'
import { useContext } from 'react'
import { sleep } from '../helpers/common'


const App = () => {  
  const { user, setUser } = useContext(GlobalStateContext);
  let hasToLogin = false

  useEffect(() => {
    
    if (user) {
      router.replace("(tabs)/database")
    }

    if (hasToLogin) {
      hasToLogin = false
      router.replace("(auth)signin")
    }

    supabase.auth.onAuthStateChange(async (_event, session) => {      
      if (session && user == null) {
          const {user, err} = await fetchUser()          
          setUser(user)
      } else if (user == null) {        
        setUser(null)
        hasToLogin = true     
      }
    })

  }, [user])

  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
  })
  

  return (    
    <SafeAreaView style={AppStyle.safeArea}>
        <CustomStatusBar></CustomStatusBar>      
        <Text>App</Text>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})