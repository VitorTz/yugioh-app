import { StyleSheet, Platform, Pressable, KeyboardAvoidingView, TextInput, Keyboard, Text, View } from 'react-native'
import DeckCustomPicker from './drop-down-picker/DeckCustomPicker'
import { AppConstants } from '@/constants/AppConstants'
import { useState, useEffect, useCallback } from 'react'
import { useRef } from 'react'
import { supaFetchDecks } from '@/lib/supabase'
import { YuGiOhDeck } from '@/helpers/types'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { debounce } from 'lodash'
import DeckGrid from './grid/DeckGrid'
import React from 'react'


var deckOptions = new Map<string, string | null | string[]>()


const GRID_COLUMNS = 2


function resetDeckFilter() {
    deckOptions.set('archetypes', [])
    deckOptions.set('attributes', [])
    deckOptions.set('frametypes', [])
    deckOptions.set('races', [])
    deckOptions.set('types', [])  
}

resetDeckFilter()


const DeckSearch = () => {

    const [decks, setDecks] = useState<YuGiOhDeck[]>([])
    const [isLoading, setLoading] = useState(false)  
    const [hasResults, setHasResults] = useState(true)
    const [isLoadingPage, setIsLoadingPage] = useState(true)
    const [dropDownPickerIsExpanded, setDropDownPickerIsExpanded] = useState(false);

    const searchRef = useRef<string | null>(null)
    const page = useRef<number>(0)

    const fetchDecks = async (append: boolean = false) => {    
        setLoading(true)      
            const {data, error} = await supaFetchDecks(searchRef.current, deckOptions, page.current)
            setHasResults(data.length > 0)
            if (data) {
            append ? setDecks([...decks, ...data]) : setDecks([...data])
            }
        setLoading(false)    
    }

    useEffect(() => {
          searchRef.current = null
          page.current = 0
          fetchDecks()
          setIsLoadingPage(false)
        }, 
        []
    )

    const handleSearch = async (text: string | null, append: boolean = false) => {
        searchRef.current = text ? text.trimEnd() : null
        page.current = append ? page.current + 1 : 0
        await fetchDecks()
    }

    const debounceSearch = useCallback(
        debounce(handleSearch, 400),
        []
    )
    
    const applyFilter = async () => {
        page.current = 0
        await handleSearch(searchRef.current)
    }

    const handleEndReached = useCallback(async () => {        
        if (!isLoading && !isLoadingPage && hasResults) {
            page.current += 1
            await fetchDecks(true)          
        }
        }, [isLoading]
    );

    const openDropDownPicker = () => {
        Keyboard.dismiss()
        setDropDownPickerIsExpanded(prev => !prev)        
    };  

    return (
        <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? "padding" : undefined} style={{flex: 1, width: '100%'}} >
            <View style={{width: '100%', marginBottom: 10}} >
                <TextInput                    
                    placeholder='search'
                    placeholderTextColor={Colors.white}    
                    onChangeText={debounceSearch}
                    style={styles.input}
                />
                <View style={{position: 'absolute', right: 10, top: 0, bottom: 0, alignItems: "center", justifyContent: "center"}}>
                    <Pressable onPress={() => openDropDownPicker()} hitSlop={AppConstants.hitSlopLarge}>
                        {
                        dropDownPickerIsExpanded ? 
                        <Ionicons size={28} color={Colors.orange} name="chevron-up-circle"></Ionicons> :
                        <Ionicons size={28} color={Colors.orange} name="chevron-down-circle"></Ionicons>
                        }
                    </Pressable>
                </View>
            </View>
            <View style={{width: '100%', marginBottom: 10, display: dropDownPickerIsExpanded ?  "flex" : "none"}} >
                <DeckCustomPicker applyFilter={applyFilter} options={deckOptions}/>                
            </View>
            <View style={{width: '100%', flex: 1}} >
                <DeckGrid
                    columns={GRID_COLUMNS}
                    isLoading={isLoading}
                    decks={decks}
                    onEndReached={handleEndReached}
                    hasResult={hasResults}/>
            </View>
        </KeyboardAvoidingView>
    )
}

export default DeckSearch

const styles = StyleSheet.create({
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
    }
})