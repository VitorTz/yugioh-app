import React from 'react'
import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import { supabase } from '../context/supabase'
import { useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import AppStyle from '../constants/AppStyle'
import { router } from 'expo-router'
import CustomStatusBar from '../components/CustomStatusBar'
import { AppState } from 'react-native'


const App = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session == null) {
        console.log("user not logged")
        router.replace("(auth)/signin")
      } else {
        router.replace("(tabs)/database")
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

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