import { 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  View
} from 'react-native'
import React  from 'react'
import AppStyle from '@/constants/AppStyle'
import CardCollectionGrid from '@/components/grid/CardCollectionGrid'
import DeckCollectionGrid from '@/components/grid/DeckCollectionGrid'


const Collection = () => {  
  console.log("oi")
  return (
    <SafeAreaView style={[AppStyle.safeArea, {rowGap: 20}]}>
      <ScrollView style={{width: '100%'}}>
        <View style={{width: '100%', gap: 20}} >                
          <CardCollectionGrid/>
          <DeckCollectionGrid/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Collection

const styles = StyleSheet.create({})