import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name='(tabs)/index' options={{headerShown: false}}/>
      <Stack.Screen name='(tabs)/home' options={{headerShown: false}}/>
      <Stack.Screen name='(auth)/signin' options={{headerShown: false}}/>
      <Stack.Screen name='+not-found' options={{headerShown: false}}/>
    </Stack>  
  )
}

export default _layout

const styles = StyleSheet.create({})