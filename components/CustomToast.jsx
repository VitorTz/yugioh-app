import { StyleSheet, View } from 'react-native'
import { toastConfig } from '../context/CustomToastConfig'
import Toast from 'react-native-toast-message'
import React from 'react'

const CustomToast = ({visibilityTime = 2000}) => {
  return (
    <View style={{width: '100%', position: 'absolute'}} >
        <Toast config={toastConfig} visibilityTime={visibilityTime} />
    </View>
  )
}

export default CustomToast

const styles = StyleSheet.create({

})