import { StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'


const CustomStatusBar = () => {
  return (
    <StatusBar barStyle={'light-content'} backgroundColor={Colors.background}/>
  )
}

export default CustomStatusBar

const styles = StyleSheet.create({})