import { StyleSheet, Text, Pressable, KeyboardAvoidingView, Platform, TextInput, View, Keyboard } from 'react-native'
import { supaFetchCards } from '@/lib/supabase'
import React, { useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import { AppConstants } from '@/constants/AppConstants'
import { debounce } from 'lodash'
import { Ionicons } from '@expo/vector-icons'
import { YuGiOhCard } from '@/helpers/types'
import { useEffect, useCallback } from 'react'
import CardCustomPicker from './drop-down-picker/CardCustomPicker'
import ImageGrid from './grid/ImageGrid'


var cardOptions = new Map<string, string | null | string[]>()

const GRID_COLUMNS = 3


function resetCardFilter() {
    cardOptions.set('archetype', [])
    cardOptions.set('attribute', [])
    cardOptions.set('frametype', [])
    cardOptions.set('race', [])
    cardOptions.set('type', [])
    cardOptions.set('sort', 'name')
    cardOptions.set('sortDirection', 'ASC')
}

resetCardFilter()

const CardSearch = () => {

    const [isLoadingPage, setIsLoadingPage] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [hasResults, setHasResults] = useState(true)
    const [cards, setCards] = useState<YuGiOhCard[]>([])
    const [dropDownPickerIsExpanded, setDropDownPickerIsExpanded] = useState(false)    

    const searchRef = useRef<string | null>(null)
    const page = useRef<number>(0)

    const fetchCards = async (append: boolean = false) => {
        console.log(page.current)
        setLoading(true)      
            const {data, error} = await supaFetchCards(searchRef.current, cardOptions, page.current)      
            setHasResults(data.length > 0)
            if (data) {
                append ? setCards([...cards, ...data]) : setCards([...data])
            }
        setLoading(false)
    }

    useEffect(() => {
            searchRef.current = null
            page.current = 0            
            fetchCards()
            setIsLoadingPage(false)
        }, 
        []
    )

    const handleSearch = async (text: string | null, append: boolean = false) => {
        searchRef.current = text ? text.trimEnd() : null
        page.current = append ? page.current + 1 : 0
        await fetchCards(append)
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
            await fetchCards(true)
        }
      }, [isLoading]
    );

    const openDropDownPicker = () => {
        Keyboard.dismiss()
        setDropDownPickerIsExpanded(prev => !prev);
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
                <CardCustomPicker applyFilter={applyFilter} options={cardOptions}/>
            </View>
            <View style={{width: '100%', flex: 1}} >
                <ImageGrid
                    columns={GRID_COLUMNS}
                    isLoading={isLoading} 
                    images={cards} 
                    onEndReached={handleEndReached}
                    hasResult={hasResults}/>
            </View>
        </KeyboardAvoidingView>
    )
}

export default CardSearch

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