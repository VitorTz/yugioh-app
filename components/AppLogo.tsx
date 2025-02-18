import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

const AppLogo = () => {
  return (
    <View style={styles.container} >
      <Text style={{fontWeight: "bold", color: Colors.pinkAccent, fontSize: 28}}>Ygo</Text>
      <Text style={{fontWeight: "bold", color: Colors.text, fontSize: 28}}>App</Text>
    </View>
  )
}

export default AppLogo

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"        
    }
})