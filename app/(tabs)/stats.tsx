import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import AppStyle from '@/constants/AppStyle'
import React from 'react'
import CardSearch from '@/components/CardSearch'
import DeckSearch from '@/components/DeckSearch'


const Stats = () => {
  return (
    <SafeAreaView style={AppStyle.safeArea} >
      <DeckSearch/>
    </SafeAreaView>
  )
}

export default Stats

const styles = StyleSheet.create({})