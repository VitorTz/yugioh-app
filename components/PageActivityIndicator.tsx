import { StyleSheet, ActivityIndicator, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'


const PageActivityIndicator = () => {
  return (
    <View style={{alignItems: "center", justifyContent: "center", flex: 1}} >
        <ActivityIndicator size={64} color={Colors.white} /> 
    </View>
  )
}

export default PageActivityIndicator

const styles = StyleSheet.create({})