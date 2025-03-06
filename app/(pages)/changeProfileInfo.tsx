import { SafeAreaView, StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import AppStyle from '@/constants/AppStyle'
import { wp, hp } from '@/helpers/util'
import { AppConstants } from '@/constants/AppConstants'

const ProfileInfo = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const handleSave = async () => {

    }
    
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background, alignItems: "center", padding: 20}} >
        <View style={{width: '100%', marginBottom: 30, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} >
            {
                loading ? 
                <View style={AppStyle.iconButton}>
                    <ActivityIndicator size={AppConstants.icon.size} color={AppConstants.icon.color} />
                </View>

                :
                <Pressable style={AppStyle.iconButton} onPress={() => handleSave()} hitSlop={{left: 20, right: 20, top: 20, bottom: 20}} >
                    <Ionicons name='checkmark-circle-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                </Pressable>
            }

            <Pressable style={AppStyle.iconButton} onPress={() => router.back()} hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}>
                <Ionicons name='arrow-back-circle-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
            </Pressable>
        </View>     
        <View style={AppStyle.backdrop}>
            <Text style={{alignSelf: "flex-start", fontSize:32, color: Colors.white, fontFamily: "LeagueSpartan_700Bold"}} >Account</Text>
        </View>
    </SafeAreaView>
  )
}

export default ProfileInfo

const styles = StyleSheet.create({})