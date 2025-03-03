import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { Colors } from '@/constants/Colors'
import React from 'react'


const PageActivityIndicator = () => {
  return (
    <View style={{flex: 1, alignItems: "center", justifyContent: "center"}} >
        <ActivityIndicator size={64} color={Colors.orange} /> 
    </View>
  )
}

export default PageActivityIndicator

const styles = StyleSheet.create({})