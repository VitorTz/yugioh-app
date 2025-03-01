import { ActivityIndicator, TextInput, NativeScrollEvent, Pressable, SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import React, { useEffect, useRef, useMemo, useState } from 'react'
import { supabase, supaFetchCards } from '@/lib/supabase'
import { FetchCardOptions, FetchCardParams, YuGiOhCard } from '@/helpers/types'
import { useCallback } from 'react'
import {debounce} from 'lodash'
import ImageGrid from '@/components/ImageGrid'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from "@gorhom/bottom-sheet";



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


var page = 0

const Database = () => {

    
  const [options, SetOptions] = useState<FetchCardOptions>(getEmptyOptions())
  const [images, setImages] = useState<YuGiOhCard[]>([])
  const [isLoading, setLoading] = useState(false)  
  const [hasResult, setHasResults] = useState(true)    

  
  const fetchCards = async (append: boolean = false) => {
    setLoading(true)
    const {cards, error} = await supaFetchCards(page, options)
    console.log(cards.length)
    setHasResults(cards.length > 0)
    if (cards) {
      page += 1
      append ? setImages([...images, ...cards]) : setImages([...cards])
    }    
    setLoading(false)
  }

  useEffect(() => { 
      page = 0
      fetchCards()
    }, 
    []
  )


  const handleSearch = async (text: string) => {
    page = 0
    console.log(text)
    options.name = text ? text : null    
    await fetchCards()    
  }

  const debounceSearch = useCallback(
      debounce(handleSearch, 400),
      [options]
  )

  let endReached = false

  const handleScroll = async (event: NativeScrollEvent) => {
    const height = event.contentSize.height
    const scrollViewHeight = event.layoutMeasurement.height
    const scrollOffset = event.contentOffset.y
    const bottomPosition = height - scrollViewHeight
    if (!endReached && scrollOffset + 40 >= bottomPosition) {
      console.log("i")
        endReached = true
        await fetchCards(true)
        endReached = false
    }  
  }
  

  return (
    <SafeAreaView style={AppStyle.safeArea}>      
      <View style={{width: '100%', marginBottom: 10}} >
        <TextInput
            placeholder='search'
            placeholderTextColor={Colors.white}    
            onChangeText={debounceSearch}
            style={styles.input}
        />
        <Pressable onPress={() => console.log("oi")}  style={styles.optionsButton}>                        
            <Ionicons size={28} color={Colors.orange} name="options-outline"></Ionicons>            
        </Pressable>
      </View>
      <ImageGrid isLoading={isLoading} images={images} onScroll={handleScroll} hasResult={hasResult} />      
    </SafeAreaView>
  )
}

export default Database

const styles = StyleSheet.create({
  image: {
    width: 156,
    height: 188,
    borderRadius: 4
  },
  searchBar: {
    width: '100%', 
    height: 50,
    paddingLeft: 42,
    backgroundColor: Colors.gray, 
    marginBottom: 20, 
    borderRadius: 4, 
    borderWidth: 2, 
    borderColor: Colors.orange,
    color: Colors.white
  },
  input: {
    paddingHorizontal: 42,
    paddingLeft: 10,
    paddingRight: 40,
    height: 50,
    borderWidth: 1,
    color: Colors.white,
    backgroundColor: Colors.gray,
    borderCurve: "continuous",    
    borderColor: Colors.orange,
    borderRadius: 4,
    fontWeight: "bold",
    fontFamily: "LeagueSpartan_400Regular"
  },
  optionsButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginRight: 10,        
    justifyContent: "center",
    alignItems: "flex-end"
  },
  bottomSheet: {
    flex: 1,
    paddingTop: 200,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
  contentContainer: {    
      backgroundColor: "white"
  }
})