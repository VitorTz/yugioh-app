import { View, Text, StatusBar } from 'react-native'
import { Stack } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { GlobalStateProvider } from '@/context/GlobalContext'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import React from 'react'


const _layout = () => {
  return (
    <GlobalStateProvider>
      <GestureHandlerRootView style={{flex: 1}} >
        <View style={{flex: 1, backgroundColor: Colors.background}} >
            <StatusBar barStyle={'light-content'} backgroundColor={Colors.background} />
            <Stack>
                <Stack.Screen name='index' options={{headerShown: false}} />
                <Stack.Screen name='(auth)/signin' options={{headerShown: false}} />
                <Stack.Screen name='(auth)/signup' options={{headerShown: false}} />
                <Stack.Screen name='(pages)/profilePhoto' options={{headerShown: false}} />
                <Stack.Screen name='(pages)/profileInfo' options={{headerShown: false}} />
                <Stack.Screen name='(pages)/cardPage' options={{headerShown: false, presentation: "transparentModal", animation: "fade"}} />
                <Stack.Screen name='(tabs)' options={{headerShown: false}} />
            </Stack>
        </View>
      </GestureHandlerRootView>
    </GlobalStateProvider>
  )
}

export default _layout
