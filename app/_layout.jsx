import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import TabBar from '../components/TabBar'

const _layout = () => {
  return (
    <Tabs tabBar={props => <TabBar {...props} />} >
        <Tabs.Screen name='index' options={{title: "splash", tabBarStyle: {display: 'none'}, headerShown: false}} />
        <Tabs.Screen name='(tabs)/database' options={{title: "Database", headerShown: false}} />
        <Tabs.Screen name='(tabs)/collection' options={{title: "Collection", headerShown: false}} />
        <Tabs.Screen name='(tabs)/stats' options={{title: "Stats", headerShown: false}} />
        <Tabs.Screen name='(tabs)/news' options={{title: "News", headerShown: false}} />
        <Tabs.Screen name='(tabs)/profile' options={{title: "Profile", headerShown: false}} />
        <Tabs.Screen name='(auth)/signin' options={{title: "SignIn", headerShown: false, tabBarStyle: {display: 'none'},}} />
        <Tabs.Screen name='(auth)/signup' options={{title: "SignIn", headerShown: false, tabBarStyle: {display: 'none'},}} />
    </Tabs>
  )
}

export default _layout

const styles = StyleSheet.create({})