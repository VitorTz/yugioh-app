import { TextInput, NativeScrollEvent, Pressable, SafeAreaView, StyleSheet, Text, View, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import { supabase, supaFetchCards } from '@/lib/supabase'
import { FetchCardOptions, YuGiOhCard } from '@/helpers/types'
import { useCallback } from 'react'
import {at, debounce} from 'lodash'
import ImageGrid from '@/components/ImageGrid'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AppConstants, ARCHETYPES, ATTRIBUTES, CARD_TYPES, DECK_TYPES, FRAMETYPES, RACES } from "@/constants/AppConstants";
import { NumberFilterType } from "@/helpers/types";
import NumberFilter from "@/components/NumberFilter";
import CategoryFilter from "@/components/CategoryFilter";
import { wp, hp } from '@/helpers/util'


var options: FetchCardOptions = {
  page: 0,
  name: null,
  archetype: null,
  frametype: null,

  race: null,
  type: null,
  attribute: null,

  level: null,
  levelEQ: null,
  levelGE: null,

  attack: null,
  attackEQ: null,
  attackGE: null,

  defence: null,
  defenceEQ: null,
  defenceGE: null
}

var endReached = false

const Database = () => {
  
  const [images, setImages] = useState<YuGiOhCard[]>([])
  const [isLoading, setLoading] = useState(false)  
  const [hasResult, setHasResults] = useState(true)      
  
  // BottomSheett
  const sheetRef = useRef<BottomSheet>(null);  
  const snapPoints = useMemo(() => ["75%"], []);
  // Filters
  const [archetype, setArchetype] = useState<string | null>(null)
  const [attribute, setAttribute] = useState<string | null>(null)
  const [frametype, setFrametype] = useState<string | null>(null)
  const [race, setRace] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)
  const [level, setLevel] = useState<NumberFilterType>({number: '', comp: null})
  const [attack, setAttack] = useState<NumberFilterType>({number: '', comp: null})
  const [defence, setDefence] = useState<NumberFilterType>({number: '', comp: null})  
  const [deckOrCard, setDeckOrCard] = useState<string | null>("Card")
  const [deckType, setDeckType] = useState<string | null>("Structure")
  
  const fetchCards = async (append: boolean = false) => {
    setLoading(true)
    const {cards, error} = await supaFetchCards(options)    
    setHasResults(cards.length > 0)
    if (cards) {
      options.page += 1
      append ? setImages([...images, ...cards]) : setImages([...cards])
    }    
    setLoading(false)
  }

  useEffect(() => { 
      options.page = 0
      fetchCards()
    }, 
    []
  )

  const handleSearch = async (text: string | null) => {    
    options.page = 0
    options.name = text ? text : null    
    await fetchCards()    
  }

  const debounceSearch = useCallback(
      debounce(handleSearch, 400),
      []
  )

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);    
    Keyboard.dismiss()
  }, []);
  
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
    Keyboard.dismiss()
  }, []);

  const handleResetFilters = async () => {    
    console.log("oi")
    handleClosePress()
    setArchetype(null)
    setAttribute(null)
    setFrametype(null)
    setRace(null)
    setType(null)
    setLevel({number: '', comp: null})
    setAttack({number: '', comp: null})
    setDefence({number: '', comp: null})    
    options.page = 0
    options.archetype = null
    options.attribute = null
    options.frametype = null
    options.type = null
    options.race = null
    options.level = null
    options.attack = null
    options.defence = null
    fetchCards()
  }  

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

  const applyFilter = async () => {
    options.page = 0
    options.archetype = archetype
    options.attribute = attribute
    options.frametype = frametype
    options.type = type
    options.race = race
    options.level = level.number != '' ? parseInt(level.number) : null
    options.attack = attack.number != '' ? parseInt(attack.number) : null
    options.defence = defence.number != '' ? parseInt(defence.number) : null
    handleClosePress()
    await fetchCards()
  }

  return (
    <SafeAreaView style={styles.safeArea}>      
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : undefined} style={{flex: 1, width: '100%'}} >
      <View style={{width: '100%', height: '100%', paddingHorizontal: 20, paddingVertical: 10}} >
        <View style={{width: '100%', marginBottom: 10}} >
          <TextInput
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
          onScroll={handleScroll} 
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
                style={{width: '100%', padding: 20}}
                keyboardShouldPersistTaps={"handled"}>
                <View style={{flexDirection: "row", gap: 20, alignItems: "center", justifyContent: "space-between"}} >
                  <Pressable onPress={() => handleClosePress()} hitSlop={AppConstants.hitSlopLarge}>
                    <Ionicons name='close-circle-outline' size={36} color={Colors.orange} />
                  </Pressable>
                  <View style={{flexDirection: "row", gap: 20, alignItems: "center", justifyContent: "center"}} >
                    <Pressable  onPress={() => applyFilter()}  hitSlop={AppConstants.hitSlopLarge} >
                      <Ionicons name='checkmark-circle-outline' size={36} color={Colors.orange} />
                    </Pressable>
                    <Pressable onPress={() => handleResetFilters()} hitSlop={AppConstants.hitSlopLarge} >
                      <Ionicons name="refresh-circle-outline" size={36} color={Colors.orange} />
                    </Pressable>
                  </View>
                </View>
                  <View style={{marginTop: 20, flexDirection: "row", width: '100%', alignItems: "center", justifyContent: "space-between"}}>
                    <NumberFilter filter={attack} setFilter={setAttack} title="Attack"/>
                    <NumberFilter filter={defence} setFilter={setDefence} title="Defence"/>
                    <NumberFilter filter={level} setFilter={setLevel} title="Level"/>
                  </View>
                  <CategoryFilter filter={deckOrCard} setFilter={setDeckOrCard} items={["Deck", "Card"]} title="Deck/Card" dismarkWhenPressedAgain={false}/>
                  {
                    deckOrCard == "Deck" && 
                    <CategoryFilter filter={deckType} setFilter={setDeckType} items={DECK_TYPES} title='Deck type' dismarkWhenPressedAgain={false}/>
                  }
                  
                  <CategoryFilter filter={archetype} setFilter={setArchetype} items={ARCHETYPES} title="Archetypes" dismarkWhenPressedAgain={true} />
                  <CategoryFilter filter={attribute} setFilter={setAttribute} items={ATTRIBUTES} title="Attributes" dismarkWhenPressedAgain={true} />
                  <CategoryFilter filter={frametype} setFilter={setFrametype} items={FRAMETYPES} title="Frametypes" dismarkWhenPressedAgain={true} />
                  <CategoryFilter filter={race} setFilter={setRace} items={RACES} title="Races" dismarkWhenPressedAgain={true} />
                  <CategoryFilter filter={type} setFilter={setType} items={CARD_TYPES} title="Types" dismarkWhenPressedAgain={true} />
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
    paddingTop: 20,
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