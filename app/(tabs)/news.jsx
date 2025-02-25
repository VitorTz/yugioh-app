import { StyleSheet, Text, View } from 'react-native'
import CustomStatusBar from '@/components/CustomStatusBar'
import { SafeAreaView } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import React from 'react'

const News = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea}>
      <CustomStatusBar></CustomStatusBar>      
      <Text>News</Text>
    </SafeAreaView>
  )
}

export default News

const styles = StyleSheet.create({})