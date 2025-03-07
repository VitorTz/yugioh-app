import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { MasonryFlashList } from '@shopify/flash-list'
import React from 'react'
import { wp } from '@/helpers/util'
import { DEFAULT_HORIZONTAL_PADDING, API_CARD_CROPPED_WIDTH, API_CARD_CROPPED_HEIGHT } from '@/constants/AppConstants'
import { YuGiOhDeck } from '@/helpers/types'
import { Colors } from '@/constants/Colors'
import DeckCard from './DeckCard'


const GRID_GAP = 16

interface DeckGridProps {
    decks: YuGiOhDeck[]
    onEndReached: () => void
    columns: number
    isLoading: boolean
    hasResult: boolean
}

const DeckGrid = ({decks, onEndReached, columns, isLoading, hasResult}: DeckGridProps) => {  

  const Footer = () => {
    return (
      <>
        {
          isLoading && 
          hasResult && 
          <ActivityIndicator size={'large'} color={Colors.orange} />
        }
      </>
    )
  }

  const deckWidth = (wp(100) - DEFAULT_HORIZONTAL_PADDING - (columns * GRID_GAP)) / columns
  const deckHeight = deckWidth * (API_CARD_CROPPED_HEIGHT / API_CARD_CROPPED_WIDTH)

  return (        
    <View style={styles.container}>
        <MasonryFlashList          
          data={decks}          
          keyboardShouldPersistTaps={"handled"}
          numColumns={columns}
          estimatedItemSize={80}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<Footer/>}          
          renderItem={
              ({item, index}) => {
                return (
                  <DeckCard columns={columns} width={deckWidth} height={deckHeight} key={index} index={index} deck={item}/>
                )
            }
          }
        />        
    </View>
  )
}

export default DeckGrid

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    flex: 1,    
  },
  noResultContainer: {
    marginTop: 16, 
    flexDirection: "row", 
    gap: 10, 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 10, 
    backgroundColor: Colors.background, 
    borderRadius: 4, 
    borderWidth: 1, 
    borderColor: Colors.orange
  },
  noResultsText: {
    color: Colors.white, 
    fontFamily: "LeagueSpartan_400Regular", 
    fontSize: 18
  },
  noResultsImage: {
    borderRadius: 48, 
    width: 48, 
    height: 48
  }
})