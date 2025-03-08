import { ActivityIndicator, NativeScrollEvent, StyleSheet, View, Text } from 'react-native'
import { FlashList, MasonryFlashList } from '@shopify/flash-list'
import { AppConstants, DEFAULT_HORIZONTAL_PADDING, API_CARD_WIDTH, API_CARD_HEIGHT } from '@/constants/AppConstants'
import { wp } from '@/helpers/util'
import ImageCard from './ImageCard'
import {Image} from 'expo-image'
import React, { useEffect, useRef, useState } from 'react'
import { YuGiOhCard } from '@/helpers/types'
import { Colors } from '@/constants/Colors'


const GRID_GAP = 10

interface ImageGridProps {
    images: YuGiOhCard[]
    onEndReached: () => void
    columns: number
    isLoading: boolean
    hasResult: boolean    
}

const ImageGrid = ({
  images, 
  onEndReached, 
  columns, 
  isLoading, 
  hasResult  
}: ImageGridProps) => {  

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
  
  const cardWidth = (wp(100) - DEFAULT_HORIZONTAL_PADDING - (columns * GRID_GAP)) / columns
  const cardHeight = cardWidth * (API_CARD_HEIGHT / API_CARD_WIDTH)

  return (        
    <View style={styles.container}>
        <FlashList
          data={images}
          keyboardShouldPersistTaps={"handled"}
          numColumns={columns}
          estimatedItemSize={cardHeight}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<Footer/>}          
          renderItem={
              ({item, index}) => {
                return (
                  <ImageCard 
                    gridColumns={columns} 
                    key={index} 
                    index={index} 
                    card={item} 
                    width={cardWidth} 
                    height={cardHeight}/>
                )
            }
          }
        />        
    </View>
  )
}

export default ImageGrid

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    flex: 1
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