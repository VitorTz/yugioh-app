import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStyle from '@/constants/AppStyle'
import CustomStatusBar from '@/components/CustomStatusBar'


const Stats = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea}>
      <CustomStatusBar></CustomStatusBar>      
      <Text>Stats</Text>
    </SafeAreaView>
  )
}

export default Stats

const styles = StyleSheet.create({})