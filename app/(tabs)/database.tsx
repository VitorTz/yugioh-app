import { 
  TextInput, 
  Pressable, 
  SafeAreaView, 
  StyleSheet, 
  Animated, 
  View, 
  KeyboardAvoidingView, 
  Keyboard, 
  ScrollView,
  Text,
  Platform 
} from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { supaFetchCards, supaFetchDecks } from '@/lib/supabase'
import { YuGiOhCard, YuGiOhDeck } from '@/helpers/types'
import { useCallback } from 'react'
import { debounce, filter } from 'lodash'
import ImageGrid from '@/components/grid/ImageGrid'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { AppConstants, DEFAULT_HORIZONTAL_PADDING } from "@/constants/AppConstants";
import { wp, hp } from '@/helpers/util'
import MultipleDropDownPicker from '@/components/drop-down-picker/MultipleDropDownPicker'
import CardCustomPicker from '@/components/drop-down-picker/CardCustomPicker'
import DeckCustomPicker from '@/components/drop-down-picker/DeckCustomPicker'
import UniqueDropDownPicker from '@/components/drop-down-picker/UniqueDropDownPicker'
import DeckGrid from '@/components/grid/DeckGrid'


var cardOptions = new Map<string, string | null | string[]>()
var deckOptions = new Map<string, string | null | string[]>()
var deckOrCard = new Map<string, string>()
var searchText: string | null
var cardPage: number = 0
var deckPage: number = 0

resetCardFilter()
resetDeckFilter()


function resetCardFilter() {
  cardOptions.set('archetype', [])
  cardOptions.set('attribute', [])
  cardOptions.set('frametype', [])
  cardOptions.set('race', [])
  cardOptions.set('type', [])
  cardOptions.set('attack', null)
  cardOptions.set('defence', null)
  cardOptions.set('level', null)
  cardOptions.set('sort', 'name')
  cardOptions.set('sortDirection', 'ASC')
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
  
  const [cards, setCards] = useState<YuGiOhCard[]>([])
  const [decks, setDecks] = useState<YuGiOhDeck[]>([])
  const [isLoading, setLoading] = useState(false)  
  const [cardHasResult, setCardHasResults] = useState(true)
  const [deckHasResults, setDeckHasResults] = useState(true)
  const [filterType, setFilterType] = useState<"Card" | "Deck">("Card")  
  const [cardPickerDropDownIsExpanded, setCardPickerDropDownIsExpanded] = useState(false);
  const [deckPickerDropDownIsExpanded, setDeckPickerDropDownIsExpanded] = useState(false);
  const textRef = useRef<TextInput>(null)  

  
  const fetchCards = async (append: boolean = false) => {
    setLoading(true)
      console.log("card page", cardPage)
      const {data, error} = await supaFetchCards(searchText, cardOptions, cardPage)      
      setCardHasResults(data.length > 0)
      if (data) {      
        append ? setCards([...cards, ...data]) : setCards([...data])
      }    
    setLoading(false)
  }

  const fetchDecks = async (append: boolean = false) => {
    setLoading(true)
      console.log("deck page", deckPage)
      const {data, error} = await supaFetchDecks(searchText, deckOptions, deckPage)      
      setDeckHasResults(data.length > 0)
      if (data) {
        append ? setDecks([...decks, ...data]) : setDecks([...data])
      }
    setLoading(false)
  }

  useEffect(() => {      
      cardPage = 0
      deckPage = 0      
      fetchCards()
      fetchDecks()      
      textRef.current?.clear()      
      // switch (filterType) {
      //     case "Card":
      //       fetchCards()
      //       break
      //     default:
      //       break
      // }      
    }, 
    []
  )

  const handleSearch = async (text: string | null, append: boolean = false) => {    
    searchText = text ? text : null
    switch (filterType) {
      case "Card":        
        cardPage = append ? cardPage + 1 : 0
        await fetchCards()
        break
      case "Deck":        
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
    switch (filterType) {
      case "Card":
        cardPage = 0       
        await fetchCards()
        break
      case "Deck":
        deckPage = 0
        await fetchDecks()
        break
    }    
  }

  const debounceApplyFilter = useCallback(
    debounce(applyFilter, 400),
    []
  )

  const handleEndReached = useCallback(async () => {
    const hasResult = filterType == "Card" ? cardHasResult : deckHasResults
    if (!isLoading && hasResult) {
      switch (filterType) {
        case "Card":
          cardPage += 1
          await fetchCards(true)
          break
        case "Deck":
          deckPage += 1
          await fetchDecks(true)
          break
        default:
          break
      }
    }
  }, [isLoading]);


  const changeFilterType = () => {
    const s = deckOrCard.get("filterType")    
    if (s == "Deck" || s == "Card" && s != filterType) {      
      setFilterType(s)
    }
  }

  const openDropDownPicker = () => {
    Keyboard.dismiss()
    switch (filterType) {
      case "Card":
        setCardPickerDropDownIsExpanded(!cardPickerDropDownIsExpanded);
        setDeckPickerDropDownIsExpanded(false)
        break
      case "Deck":
        setDeckPickerDropDownIsExpanded(!deckPickerDropDownIsExpanded)
        setCardPickerDropDownIsExpanded(false)
        break
    }
  };  

  return (
    <SafeAreaView style={styles.safeArea}>      
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : undefined} style={{flex: 1, width: '100%'}} >
        <View style={{width: '100%', height: '100%', paddingHorizontal: DEFAULT_HORIZONTAL_PADDING, paddingBottom: 10}} >
          <View style={{width: '100%', marginBottom: 10}} >
            <TextInput
                ref={textRef}
                placeholder='search'
                placeholderTextColor={Colors.white}    
                onChangeText={debounceSearch}
                style={styles.input}
            />
            <View style={{position: 'absolute', right: 10, top: 0, bottom: 0, alignItems: "center", justifyContent: "center"}}>
              <Pressable onPress={() => openDropDownPicker()} hitSlop={AppConstants.hitSlopLarge}>
                {
                  cardPickerDropDownIsExpanded ? 
                  <Ionicons size={28} color={Colors.orange} name="chevron-up-circle"></Ionicons> :
                  <Ionicons size={28} color={Colors.orange} name="chevron-down-circle"></Ionicons>
                }
              </Pressable>
            </View>
          </View>

          <View style={{width: '100%', marginBottom: 10, display:  cardPickerDropDownIsExpanded || deckPickerDropDownIsExpanded ? "flex" : "none"}} >
              <UniqueDropDownPicker title='Deck/Card' options={deckOrCard} optionKey='filterType' applyPicker={changeFilterType} data={["Deck", "Card"]} defaultValue='Card' zindex={10} />
          </View>

          <View style={{width: '100%', marginBottom: 10, display: cardPickerDropDownIsExpanded ?  "flex" : "none"}} >
            <CardCustomPicker applyFilter={debounceApplyFilter} options={cardOptions}/>
          </View>

          <View style={{width: '100%', marginBottom: 10, display: deckPickerDropDownIsExpanded ?  "flex" : "none"}} >
              <DeckCustomPicker applyFilter={debounceApplyFilter} options={deckOptions} />
          </View>
          
          <View style={{width: '100%', flex: 1, display: filterType == "Card" ?  "flex" : "none"}} >
            <ImageGrid 
              isLoading={isLoading} 
              images={cards} 
              onEndReached={handleEndReached}
              hasResult={cardHasResult}/>
          </View>

          <View style={{width: '100%', flex: 1, display: filterType == "Deck" ? "flex" : "none"}} >
            <DeckGrid
              isLoading={isLoading}
              decks={decks}
              onEndReached={handleEndReached}
              hasResult={deckHasResults}/>
          </View>

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
