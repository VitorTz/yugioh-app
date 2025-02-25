import { StyleSheet, Text, SafeAreaView, View } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import CustomStatusBar from '@/components/CustomStatusBar'
import React from 'react'

const Collection = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea}>
      <CustomStatusBar></CustomStatusBar>      
      <Text>Collection</Text>
    </SafeAreaView>
  )
}

export default Collection

const styles = StyleSheet.create({})