import { StyleSheet, Text, View } from 'react-native'
import FilterComponent from './FilterComponent'
import { Filter } from '@/helpers/types'
import { ARCHETYPES, ATTRIBUTES, FRAMETYPES, RACES, CARD_TYPES, ORDER_OPTIONS, CARD_ORDER_BY_OPTIONS } from '@/constants/AppConstants'
import React from 'react'
import NumberFilter from './NumberFilter'


const CardFilters = ({cardFilter, shouldResetFilters}: {cardFilter: Filter, shouldResetFilters: boolean}) => {
  return (
    <>  
        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}} >
            <NumberFilter filter={cardFilter} title='Attack' filterKey='attack' maxLenght={4} shouldResetFilter={shouldResetFilters} />
            <NumberFilter filter={cardFilter} title='Defence' filterKey='defence' maxLenght={4} shouldResetFilter={shouldResetFilters} />
            <NumberFilter filter={cardFilter} title='Level' filterKey='level' maxLenght={4} shouldResetFilter={shouldResetFilters} />
        </View> 
        <FilterComponent filter={cardFilter} title='Archetype' filterKey='archetype' items={ARCHETYPES} dismarkWhenPressedAgain={true} shouldResetFilters={shouldResetFilters} />
        <FilterComponent filter={cardFilter} title='Attribute' filterKey='attribute' items={ATTRIBUTES} dismarkWhenPressedAgain={true} shouldResetFilters={shouldResetFilters}/>
        <FilterComponent filter={cardFilter} title='Frametype' filterKey='frametype' items={FRAMETYPES} dismarkWhenPressedAgain={true} shouldResetFilters={shouldResetFilters}/>
        <FilterComponent filter={cardFilter} title='Race' filterKey='race' items={RACES} dismarkWhenPressedAgain={true} shouldResetFilters={shouldResetFilters}/>
        <FilterComponent filter={cardFilter} title='Type' filterKey='type' items={CARD_TYPES} dismarkWhenPressedAgain={true} shouldResetFilters={shouldResetFilters}/>
        <FilterComponent filter={cardFilter} title='Sort' filterKey='orderBy' items={CARD_ORDER_BY_OPTIONS} dismarkWhenPressedAgain={false} defaultValue={'name'} shouldResetFilters={shouldResetFilters}/>
        <FilterComponent filter={cardFilter} title='Sort Direction' filterKey='order' items={ORDER_OPTIONS} dismarkWhenPressedAgain={false} defaultValue={'ASC'} shouldResetFilters={shouldResetFilters}/>
    </>
  )
}

export default CardFilters

const styles = StyleSheet.create({})