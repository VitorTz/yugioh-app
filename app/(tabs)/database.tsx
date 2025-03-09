import { 
  TextInput, 
  Text,
  Pressable, 
  SafeAreaView, 
  StyleSheet,   
  View, 
  KeyboardAvoidingView, 
  Keyboard,   
  Platform 
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Animated, { FadeInLeft, FadeInRight } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { AppConstants, DEFAULT_HORIZONTAL_PADDING } from "@/constants/AppConstants";
import { wp, hp } from '@/helpers/util'
import AppStyle from '@/constants/AppStyle';
import CardSearch from '@/components/CardSearch'
import DeckSearch from '@/components/DeckSearch'

const Database = () => {

  const [filter, setFilter] = useState<"Deck" | "Card">("Card")

  const changeFilter = () => {
    setFilter(prev => prev == "Card" ? "Deck" : "Card")
  }
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{width: '100%', marginTop: 10, flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 20}} >
        <Pressable onPress={changeFilter}  style={{flex: 1, alignItems: "center", paddingBottom: 10}} >
          <Text style={AppStyle.textHeader}>Cards</Text>
          {
            filter == "Card" &&
            <Animated.View entering={FadeInLeft.delay(50).duration(600)} style={{width: '90%', height: 2, backgroundColor: Colors.orange, marginTop: 10}} />
          }
        </Pressable>

        <Pressable onPress={changeFilter} style={{flex: 1, alignItems: "center", paddingBottom: 10}} >
          <Text style={AppStyle.textHeader}>Decks</Text>
          {
            filter == "Deck" &&
            <Animated.View entering={FadeInRight.delay(50).duration(600)} style={{width: '90%', height: 2, backgroundColor: Colors.orange, marginTop: 10}} />
          }
        </Pressable>
      </View>

      <View style={{flex: 1, width: '100%'}} >
          {
            filter == "Card" &&
            <CardSearch/>
          }
          {
            filter == "Deck" &&
            <DeckSearch/>
          }
      </View>
    </SafeAreaView>
  )
}

export default Database

const styles = StyleSheet.create({
  safeArea: {
    width: wp(100),
    height: hp(100),
    alignItems: "center",        
    backgroundColor: Colors.background, 
    paddingHorizontal: 10,
    paddingTop: 4,
    paddingBottom: 70,
  },
  
})
