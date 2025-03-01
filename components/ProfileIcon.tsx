import { StyleSheet } from 'react-native'
import { ImageDB } from '@/helpers/types'
import {Image} from 'expo-image'
import { Ionicons } from '@expo/vector-icons'
import { AppConstants } from '@/constants/AppConstants'
import Animated, { FadeInUp } from 'react-native-reanimated'
import React from 'react'
import { Colors } from '@/constants/Colors'


interface ProfileIconProps {
    image: ImageDB | undefined | null
    accentColor: string | undefined | null
    animationDelay?: number
    animationDuration?: number
}

const ProfileIcon = ({image, accentColor, animationDelay = 100, animationDuration = 600}: ProfileIconProps) => {
    const color = accentColor ? accentColor : Colors.background
    return (
        <Animated.View entering={FadeInUp.delay(animationDelay).duration(animationDuration)} >
            {        
                image ?
                <Image
                    style={[styles.image, {backgroundColor: color}]}
                    source={image.image_url}
                    contentFit="cover"/> 
                :
                <Ionicons 
                    size={128} 
                    color={AppConstants.icon.color} 
                    name='person-circle'/>
            }
        </Animated.View>
    )
}

export default ProfileIcon

const styles = StyleSheet.create({
    image: {
        width: 128,
        height: 128,
        borderRadius: 128
    }
})