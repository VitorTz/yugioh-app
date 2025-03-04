import CustomDropDownPicker from './CustomDropDownPicker';
import { 
    ARCHETYPES, 
    ATTRIBUTES, 
    CARD_TYPES, 
    FRAMETYPES, 
    SORT_DIRECTIONS, 
    RACES, 
    CARD_SORT_OPTIONS 
} from '@/constants/AppConstants';
import {View} from 'react-native';
import React from 'react';


interface CardCustomPickerProps {
    options: Map<string, string | string[] | null>
    applyFilter: () => void
}


const CardCustomPicker = ({options, applyFilter}: CardCustomPickerProps) => {
    return (
        <View style={{gap: 10, width: '100%'}} >
            <CustomDropDownPicker options={options} optionKey='archetype' applyPicker={applyFilter} title='Archetype' data={ARCHETYPES} zindex={7} multiple={true} />
            <CustomDropDownPicker options={options} optionKey='attribute' applyPicker={applyFilter} title='Attribute' data={ATTRIBUTES} zindex={6} multiple={true}/>
            <CustomDropDownPicker options={options} optionKey='frametype' applyPicker={applyFilter} title='Frametype' data={FRAMETYPES} zindex={5} multiple={true}/>
            <CustomDropDownPicker options={options} optionKey='race' applyPicker={applyFilter} title='Race' data={RACES} zindex={4} multiple={true}/>
            <CustomDropDownPicker options={options} optionKey='type' applyPicker={applyFilter} title='Type' data={CARD_TYPES} zindex={3} multiple={true}/>
            <CustomDropDownPicker options={options} optionKey='sort' applyPicker={applyFilter} title='Sort' data={CARD_SORT_OPTIONS} zindex={2} multiple={false}/>
            <CustomDropDownPicker options={options} optionKey='sortDirection' applyPicker={applyFilter} title='Sort Direction' data={SORT_DIRECTIONS} zindex={1} multiple={false}/>
        </View>
    )
}

export default CardCustomPicker