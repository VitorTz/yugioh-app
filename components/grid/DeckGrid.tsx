import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { DECK_GRID_COLUMNS } from '@/constants/AppConstants'
import React from 'react'
import { YuGiOhDeck } from '@/helpers/types'
import { Colors } from '@/constants/Colors'
import DeckCard from './DeckCard'


interface ImageGridProps {
    decks: YuGiOhDeck[]
    onEndReached: () => void
    isLoading: boolean
    hasResult: boolean
}

const DeckGrid = ({decks, onEndReached, isLoading, hasResult}: ImageGridProps) => {  

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

  return (        
    <View style={styles.container}>
        <FlashList          
          data={decks}
          keyboardShouldPersistTaps={"handled"}
          numColumns={DECK_GRID_COLUMNS}
          estimatedItemSize={80}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<Footer/>}          
          renderItem={
              ({item, index}) => {
                return (
                  <DeckCard key={index} index={index} deck={item}/>
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
    padding: 10,    
    backgroundColor: Colors.gray,     
    borderWidth: 1,
    borderColor: Colors.orange,    
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