import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import React from 'react'
import { Colors } from '@/constants/Colors'
import { supabase } from '@/lib/supabase'
import { useGlobalState } from '@/context/GlobalContext'


const Database = () => {

  const {context, setContext} = useGlobalState()
  
  return (
    <SafeAreaView style={AppStyle.safeArea} >
      
    </SafeAreaView>
  )
}

export default Database

const styles = StyleSheet.create({})