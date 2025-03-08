import { StyleSheet, Pressable, ActivityIndicator, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AppConstants } from '@/constants/AppConstants'
import React, { useState } from 'react'


const SaveButton = ({save}: {save: () => void}) => {

    const [saving, setSaving] = useState(false)

    const handleSave = async () => {
        setSaving(true)
        await save()
        setSaving(false)
    }

    return (
        <>    
            {
                saving ? 
                <View  >
                    <ActivityIndicator color={AppConstants.icon.color} size={AppConstants.icon.size} />
                </View>
                :
                <Pressable onPress={handleSave} hitSlop={AppConstants.hitSlopLarge} >
                    <Ionicons name='checkmark-circle-outline' color={AppConstants.icon.color} size={AppConstants.icon.size}/>
                </Pressable>
            }
        </>
    )
}

export default SaveButton

const styles = StyleSheet.create({})