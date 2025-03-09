import { 
  StyleSheet, 
  Pressable,
  Text,
  SafeAreaView,
  ScrollView,
  View
} from 'react-native'
import Animated from 'react-native-reanimated'
import { FadeInRight, FadeInLeft } from 'react-native-reanimated'
import React, { useState }  from 'react'
import AppStyle from '@/constants/AppStyle'
import CardCollectionGrid from '@/components/grid/CardCollectionGrid'
import DeckCollectionGrid from '@/components/grid/DeckCollectionGrid'
import { Colors } from '@/constants/Colors'


const Collection = () => {  
  const [filter, setFilter] = useState<"Deck" | "Card">("Card")

  const changeFilter = () => {
    setFilter(prev => prev == "Deck" ? "Card" : "Deck")
  }

  return (
    <SafeAreaView style={[AppStyle.safeArea, {rowGap: 20}]}>
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
      <ScrollView style={{width: '100%'}}>
        {
          filter ==  "Card" &&
          <CardCollectionGrid/>
        }
        {
          filter ==  "Deck" &&
          <DeckCollectionGrid/>
        }        
      </ScrollView>
    </SafeAreaView>
  )
}

export default Collection

const styles = StyleSheet.create({})