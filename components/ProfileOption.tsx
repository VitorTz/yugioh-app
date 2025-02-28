import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native'
import { AppConstants } from '@/constants/AppConstants'
import { Ionicons } from '@expo/vector-icons'
import Animated, { FadeInLeft } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors'
import React, { useState } from 'react'


interface ProfileOptionProps {
    title: string
    subtitle: string | null
    iconName: string
    onPress: () => void
    index: number    
}

  
const ProfileOption = ({
    title, 
    subtitle = null, 
    iconName,
    onPress,
    index    
}: ProfileOptionProps) => {
    const [loading, setLoading] = useState(false)

    const handlePress = async () => {
        setLoading(true)
        await onPress()
        setLoading(false)
    }

    return (
    <Animated.View entering={FadeInLeft.delay((index + 1) * 50).duration(700)} >
        <Pressable style={styles.profileOption} onPress={handlePress} >
        <View style={{flexDirection: "row", gap: 20, alignItems: "center"}} >
            <Ionicons name={iconName} size={AppConstants.icon.size} color={AppConstants.icon.color} />
            <View>
            <Text style={styles.profileOptionText} >{title}</Text>
            {
                subtitle && 
                <Text style={styles.profileOptionTextDesc} >{subtitle}</Text>
            }            
            </View>
        </View>
        {
            loading ? 
            <ActivityIndicator size={AppConstants.icon.size} color={AppConstants.icon.color} />
            :
            <Pressable>
                <Ionicons name='chevron-forward-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
            </Pressable>                  
        }
        </Pressable>
    </Animated.View>
    )
}

export default ProfileOption

const styles = StyleSheet.create({
    profileOption: {
    width: '100%', 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between"
    },
    profileOptionText: {
    color: Colors.text, 
    fontSize: 20, 
    fontFamily: "LeagueSpartan_400Regular"
    },
    profileOptionTextDesc: {
    color: Colors.text, 
    fontSize: 14, 
    fontFamily: "LeagueSpartan_400Regular"
    }
})