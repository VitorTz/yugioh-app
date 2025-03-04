import { TextInput, Pressable, SafeAreaView, StyleSheet, Animated, View, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { supaFetchCards, supaFetchDecks } from '@/lib/supabase'
import { YuGiOhCard } from '@/helpers/types'
import { useCallback } from 'react'
import { debounce } from 'lodash'
import ImageGrid from '@/components/ImageGrid'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { AppConstants } from "@/constants/AppConstants";
import { wp, hp } from '@/helpers/util'
import CardCustomPicker from '@/components/CardCustomPicker'


var cardOptions = new Map<string, string | null | string[]>()
var deckOptions = new Map<string, string | null | string[]>()
var cardSearchText: string | null = null
var deckSearchText: string | null = null
var cardPage: number = 0
var deckPage: number = 0

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
  const [filterType, setFilterType] = useState<"Card" | "Deck">("Card")  
  const [expanded, setExpanded] = useState(false);
  const textRef = useRef<TextInput>(null)  

  
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

  const applyFilter = async () => {    
    console.log("apply")
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

  const debounceApplyFilter = useCallback(
    debounce(applyFilter, 400),
    []
  )

  const handleEndReached = useCallback(async () => {
    if (!isLoading && hasResult) {      
      console.log("end")
      cardPage += 1
      await fetchCards(true)
    }
  }, [isLoading]);


  const toggleAnimation = () => {
    Keyboard.dismiss()
    setExpanded(!expanded);
  };

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
              <Pressable onPress={() => toggleAnimation()} hitSlop={AppConstants.hitSlopLarge}>
                {
                  expanded ? 
                  <Ionicons size={28} color={Colors.orange} name="chevron-up-circle"></Ionicons> :
                  <Ionicons size={28} color={Colors.orange} name="chevron-down-circle"></Ionicons>
                }
              </Pressable>
            </View>
          </View>   
          <View style={{width: '100%', marginBottom: 10, display: expanded ?  "flex" : "none"}} >
            <CardCustomPicker applyFilter={debounceApplyFilter} options={cardOptions}/>
          </View>
          <ImageGrid 
            isLoading={isLoading} 
            images={images} 
            onEndReached={handleEndReached}
            hasResult={hasResult}/>
        </View>
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
