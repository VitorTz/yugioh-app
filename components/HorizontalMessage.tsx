import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'


interface Props {
    message: string
}


const HorizontalMessage: React.FC<Props> = ({message}) => {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text style={styles.text}>{message}</Text>
      <View style={styles.line}></View>
    </View>
  )
}

export default HorizontalMessage

const styles = StyleSheet.create({
    container: {
        width: '100%',
        columnGap: 10,
        flexDirection: "row",        
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20
    },
    line: {
        width: '30%',
        height: 1,
        marginTop: 5,
        backgroundColor: Colors.pinkAccent
    },
    text: {
        color: Colors.pinkAccent,
        fontSize: 14
    }
})