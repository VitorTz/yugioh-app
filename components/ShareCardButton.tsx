import { StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import { AppConstants } from '@/constants/AppConstants'
import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import AppStyle from '@/constants/AppStyle'
import * as Sharing from 'expo-sharing';
import { downloadImage } from '@/helpers/util'
import React, { useState } from 'react'


const ShareCardButton = ({image_url}: {image_url: string}) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleShare = async () => {
        setIsLoading(true)
        const {success, status, path}  = await downloadImage("ygotempimage.jpg", image_url)
        setIsLoading(false)
        if (success) {
            await Sharing.shareAsync(path)
            await FileSystem.deleteAsync(path)
        }
    }

    return (
        <Pressable onPress={handleShare} style={AppStyle.iconButton}  hitSlop={AppConstants.hitSlopLarge} >
            {
                isLoading ?
                <ActivityIndicator size={AppConstants.icon.size} color={AppConstants.icon.color} /> :
                <Ionicons name='share-social-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
            }
        </Pressable>
    )
}

export default ShareCardButton

const styles = StyleSheet.create({})