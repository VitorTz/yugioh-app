import { StyleSheet, Pressable, Text, View } from 'react-native'
import { AppConstants } from '@/constants/AppConstants'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'


const BackButton = () => {
  return (
    <>
        <Pressable onPress={() => router.back()} hitSlop={AppConstants.hitSlopLarge}>
            <Ionicons name='arrow-back-circle-outline' color={AppConstants.icon.color} size={AppConstants.icon.size} />
        </Pressable>
    </>
  )
}

export default BackButton

const styles = StyleSheet.create({})