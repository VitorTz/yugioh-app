import { View, Text, StatusBar } from 'react-native'
import { Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import React from 'react'


const _layout = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.background}} >
        <StatusBar barStyle={'light-content'} backgroundColor={Colors.background} />
        <Stack>
            <Stack.Screen name='index' options={{headerShown: false}} />
            <Stack.Screen name='(tabs)' options={{headerShown: false}} />
        </Stack>
    </View>
  )
}

export default _layout