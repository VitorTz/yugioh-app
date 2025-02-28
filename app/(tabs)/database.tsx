import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import React, { useEffect, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { FetchCardOptions, supabase, supaFetchCards } from '@/lib/supabase'
import { useGlobalState } from '@/context/GlobalContext'


function getEmptyOptions(): FetchCardOptions {
    return {
      name: null,
      archetype: null,
      frametype: null,
      race: null,
      type: null,
      attribute: null,
      level: null,
      levelGE: null,
      levelGEQ: null,
      attack: null,
      attackGE: null,
      attackGEQ: null,
      defence: null,
      defenceGE: null,
      defenceGEQ: null,
      card_id: null
    }
} 


const Database = () => {

  const {context, setContext} = useGlobalState()
  
  const [options, SetOptions] = useState<FetchCardOptions | null>(getEmptyOptions())

  
  const fetchCards = async () => {
    const {cards, error} = await supaFetchCards(0)
    cards.forEach((item) => console.log(item.name))
  }

  useEffect(
    () => {
      fetchCards()
    },
    [options]
  )
  
  return (
    <SafeAreaView style={AppStyle.safeArea} >
      
    </SafeAreaView>
  )
}

export default Database

const styles = StyleSheet.create({})