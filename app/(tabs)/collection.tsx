import { 
  API_CARD_CROPPED_HEIGHT, 
  API_CARD_CROPPED_WIDTH, 
  API_CARD_HEIGHT, 
  API_CARD_WIDTH, 
  AppConstants 
} from '@/constants/AppConstants'
import { 
  StyleSheet, 
  SafeAreaView, 
  Text, 
  View, 
  Pressable, 
  ActivityIndicator 
} from 'react-native'
import AppStyle from '@/constants/AppStyle'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { capitalize, debounce } from 'lodash'
import { Session } from '@supabase/supabase-js'
import { useFocusEffect } from 'expo-router'
import { supabase, supaFetchUserCards, supaFetchUserDecks } from '@/lib/supabase'
import { YuGiOhUserCard, YuGiOhUserDeck } from '@/helpers/types'
import PageActivityIndicator from '@/components/PageActivityIndicator'
import { getItemGridDimensions, hp } from '@/helpers/util'
import { FlashList } from '@shopify/flash-list'
import { Image } from 'expo-image'
import { ScrollView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import PieChartComponent, { PieCharData } from '@/components/chart/PieChart'
import CardCollectionGrid from '@/components/grid/CardCollectionGrid'
import DeckCollectionGrid from '@/components/grid/DeckCollectionGrid'


const Collection = () => {  
  
  return (
    <SafeAreaView style={[AppStyle.safeArea, {rowGap: 20}]}>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', gap: 20}} >                
          <CardCollectionGrid/>
          <DeckCollectionGrid/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Collection

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    padding: 20, 
    backgroundColor: Colors.gray, 
    borderRadius: 4, 
    borderWidth: 1, 
    gap: 20,
    borderColor: Colors.orange
  }
})