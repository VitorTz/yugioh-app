import { ActivityIndicator, NativeScrollEvent, StyleSheet, View, Text } from 'react-native'
import { MasonryFlashList } from '@shopify/flash-list'
import { AppConstants, CARD_GRID_COLUMNS } from '@/constants/AppConstants'
import ImageCard from './ImageCard'
import {Image} from 'expo-image'
import React, { useEffect, useRef, useState } from 'react'
import { YuGiOhCard } from '@/helpers/types'
import { Colors } from '@/constants/Colors'


interface ImageGridProps {
    images: YuGiOhCard[]
    onEndReached: () => void
    columns: number
    isLoading: boolean
    hasResult: boolean
}

const ImageGrid = ({images, onEndReached, columns, isLoading, hasResult}: ImageGridProps) => {  

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
        <MasonryFlashList          
          data={images}
          keyboardShouldPersistTaps={"handled"}
          numColumns={CARD_GRID_COLUMNS}
          estimatedItemSize={80}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={<Footer/>}          
          renderItem={
              ({item, index}) => {
                return (
                  <ImageCard key={index} index={index} card={item}/>
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