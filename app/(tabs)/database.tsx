import { TextInput, NativeScrollEvent, Pressable, SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, Platform, ActivityIndicator } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { supabase, supaFetchCards, supaFetchDecks } from '@/lib/supabase'
import { CardOrderBy, Filter, Order, YuGiOhCard } from '@/helpers/types'
import { useCallback } from 'react'
import {at, debounce} from 'lodash'
import ImageGrid from '@/components/ImageGrid'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AppConstants, ARCHETYPES, ATTRIBUTES, CARD_ORDER_BY_OPTIONS, CARD_TYPES, DECK_TYPES, FRAMETYPES, ORDER_OPTIONS, RACES } from "@/constants/AppConstants";
import NumberFilter from "@/components/NumberFilter";
import FilterComponent from "@/components/FilterComponent";
import { wp, hp } from '@/helpers/util'
import { FlatList } from 'react-native'
import CardFilters from '@/components/CardFilters'
import CardCustomPicker from '@/components/CardCustomPicker'


var cardOptions = new Map<string, string | null | string[]>()
var deckOptions = new Map<string, string | null | string[]>()
var cardSearchText: string | null = null
var deckSearchText: string | null = null
var cardPage: number = 0
var deckPage: number = 0
var endReached = false

resetCardFilter()
resetDeckFilter()


function resetCardFilter() {
  cardOptions.set('archetype', null)
  cardOptions.set('attribute', null)
  cardOptions.set('frametype', null)
  cardOptions.set('race', null)
  cardOptions.set('type', null)
  cardOptions.set('attack', null)
  cardOptions.set('defence', null)
  cardOptions.set('level', null)
  cardOptions.set('orderBy', 'name')
  cardOptions.set('order', 'ASC')
}

function resetDeckFilter() {
  deckOptions.set('archetypes', [])
  deckOptions.set('attributes', [])
  deckOptions.set('frametypes', [])
  deckOptions.set('races', [])
  deckOptions.set('types', [])
  deckOptions.set('avg_attack', null)
  deckOptions.set('avg_defence', null)
  deckOptions.set('avg_level', null)
}

const Database = () => {
  
  const [images, setImages] = useState<YuGiOhCard[]>([])
  const [isLoading, setLoading] = useState(false)  
  const [hasResult, setHasResults] = useState(true)      
  const textRef = useRef<TextInput>(null)

  // BottomSheett
  const sheetRef = useRef<BottomSheet>(null);  
  const snapPoints = useMemo(() => ["75%"], []);
  
  // Filters
  const [filterType, setFilterType] = useState<"Deck" | "Card">("Card")

  const [shouldResetFilters, setShouldResetFilter] = useState(false)
  
  
  const fetchCards = async (append: boolean = false) => {
    setLoading(true)
      console.log("card page", cardPage)
      const {cards, error} = await supaFetchCards(cardSearchText, cardOptions, cardPage)      
      setHasResults(cards.length > 0)
      if (cards) {      
        append ? setImages([...images, ...cards]) : setImages([...cards])
      }    
    setLoading(false)
  }

  const fetchDecks = async (append: boolean = false) => {
    setLoading(true)
    
    setLoading(false)
  }

  useEffect(() => { 
      cardPage = 0
      deckPage = 0
      textRef.current?.clear()      
      fetchCards()
    }, 
    []
  )

  useEffect(
    () => {
      if (shouldResetFilters) {
        console.log("reseting filters")
        handleResetFilters()
        setShouldResetFilter(false)
      }
    },
    [shouldResetFilters]
  )

  const handleSearch = async (text: string | null, append: boolean = false) => {
    const s: string | null = text ? text : null
    switch (filterType) {
      case "Card":
        cardSearchText = s
        cardPage = append ? cardPage + 1 : 0
        await fetchCards()
        break
      case "Deck":
        deckSearchText = s
        deckPage = append ? deckPage + 1 : 0
        await fetchDecks()
        break
      default:
        break
    }    
  }

  const debounceSearch = useCallback(
      debounce(handleSearch, 400),
      []
  )

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);    
    Keyboard.dismiss()
  }, []);
  
  const handleClosePress = () => {
    sheetRef.current?.close();
    Keyboard.dismiss()
  }

  const handleResetFilters = useCallback(
    async () => {      
      switch (filterType) {
        case "Card":
          resetCardFilter()    
          cardPage = 0
          await fetchCards()
          break
        }    
    },
    [shouldResetFilters]
  ) 

  const applyFilter = async () => {
    handleClosePress()    
    switch (filterType) {
      case "Card":
        cardPage = 0       
        await fetchCards()
        break
      case "Deck":
        deckPage = 0
        break
    }    
  }

  const applyReset = () => {
    handleClosePress()
    setShouldResetFilter(true)
  }

  const handleEndReached = useCallback(async () => {
    if (!isLoading && hasResult) {      
      console.log("end")
      cardPage += 1
      await fetchCards(true)
    }
  }, [isLoading]);


  return (
    <SafeAreaView style={styles.safeArea}>      
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : undefined} style={{flex: 1, width: '100%'}} >
        <View style={{width: '100%', height: '100%', paddingHorizontal: 16, paddingVertical: 10}} >
          <View style={{width: '100%', marginBottom: 10}} >
            <TextInput
                ref={textRef}
                placeholder='search'
                placeholderTextColor={Colors.white}    
                onChangeText={debounceSearch}
                style={styles.input}
            />
            <View style={{position: 'absolute', right: 10, top: 0, bottom: 0, alignItems: "center", justifyContent: "center"}}>
              <Pressable onPress={() => handleSnapPress(0)} hitSlop={AppConstants.hitSlopLarge}>
                <Ionicons size={28} color={Colors.orange} name="options-outline"></Ionicons>
              </Pressable>
            </View>
          </View>        
          <ImageGrid 
            isLoading={isLoading} 
            images={images} 
            onEndReached={handleEndReached}
            hasResult={hasResult}/>
        </View>
        
            <BottomSheet
              ref={sheetRef}
              index={-1}          
              handleIndicatorStyle={{display: "none"}}
              snapPoints={snapPoints}                 
              backgroundStyle={{backgroundColor: Colors.gray}}
              enableDynamicSizing={false}   
              enableContentPanningGesture={false}>
              <View>
                <BottomSheetScrollView 
                  style={{width: '100%', padding: 20, paddingVertical: 10}}
                  keyboardShouldPersistTaps={"handled"}>
                  <View style={{flexDirection: "row", gap: 20, alignItems: "center", justifyContent: "space-between", marginBottom: 20}} >
                    <View style={{flexDirection: "row", gap: 42, alignItems: "center", justifyContent: "center"}} >
                      <Pressable  onPress={() => applyFilter()}  hitSlop={AppConstants.hitSlopLarge} >
                        <Ionicons name='checkmark-circle-outline' size={42} color={Colors.orange} />
                      </Pressable>
                      <Pressable onPress={() => applyReset()} hitSlop={AppConstants.hitSlopLarge}>
                        <Ionicons name="refresh-circle-outline" size={42} color={Colors.orange} />
                      </Pressable>
                    </View>
                      <Pressable onPress={() => handleClosePress()} hitSlop={AppConstants.hitSlopLarge}>
                        <Ionicons name='close-circle-outline' size={42} color={Colors.orange} />
                      </Pressable>
                  </View>
                    <CardCustomPicker/>
                    <CardFilters cardFilter={cardOptions} shouldResetFilters={shouldResetFilters} />
                    <View style={{width: '100%', height: 60}} ></View>
                </BottomSheetScrollView>
              </View>
            </BottomSheet>        
          

        </KeyboardAvoidingView>
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
    paddingTop: 4,
    paddingBottom: 70,
    
  },
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
    width: 50,
    top: 0,
    left: 0,
    right: 10,
    bottom: 0,
    backgroundColor: "red",       
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
