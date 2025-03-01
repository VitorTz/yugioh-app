import { ActivityIndicator, NativeScrollEvent, StyleSheet, View, Text } from 'react-native'
import { FlashList, useBlankAreaTracker } from '@shopify/flash-list'
import { AppConstants } from '@/constants/AppConstants'
import ImageCard from './ImageCard'
import {Image} from 'expo-image'
import React, { useEffect, useRef } from 'react'
import { YuGiOhCard } from '@/helpers/types'
import { Colors } from '@/constants/Colors'


interface ImageGridProps {
    images: YuGiOhCard[]
    onScroll: (event: NativeScrollEvent) => void    
    isLoading: boolean
    hasResult: boolean
}

const ImageGrid = ({images, onScroll, isLoading, hasResult}: ImageGridProps) => {    

  return (        
    <View style={styles.container}>
        <FlashList          
          data={images}                         
          numColumns={AppConstants.gridColumns}                
          estimatedItemSize={128}          
          onScroll={event => onScroll(event.nativeEvent)}
          scrollEventThrottle={5}          
          renderItem={
              ({item, index}) => {
                return (
                  <ImageCard key={index} index={index} item={item}/>
                )
            }
          }
        />
        {
          isLoading && hasResult &&
          <View style={{marginTop: 10}} >
            <ActivityIndicator size={32} color={Colors.orange} />
          </View>
        }
        {
          !hasResult && 
          <View style={styles.noResultContainer} >
            <Text style={styles.noResultsText} >you fetched all results</Text>
            <Image style={styles.noResultsImage} contentFit='cover' source={require("@/assets/images/kuriboh-sad.gif")} />
          </View>
        }
    </View>
  )
}

export default ImageGrid

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    flex: 1, 
    padding: 20, 
    backgroundColor: Colors.gray, 
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.orange
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