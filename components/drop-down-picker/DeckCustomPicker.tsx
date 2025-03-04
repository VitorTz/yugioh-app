import MultipleDropDownPicker from './MultipleDropDownPicker';
import { 
    ARCHETYPES, 
    ATTRIBUTES, 
    CARD_TYPES, 
    FRAMETYPES,     
    RACES    
} from '@/constants/AppConstants';
import SortDropDownPicker from './SortDropDownPicker';
import {View} from 'react-native';
import React from 'react';


interface CardCustomPickerProps {
    options: Map<string, string | string[] | null>
    applyFilter: () => void
}


const DeckCustomPicker = ({options, applyFilter}: CardCustomPickerProps) => {
    return (
        <View style={{flexWrap: 'wrap', flexDirection: "row",  gap: 10, width: '100%'}} >
            <View style={{width: '48%'}} >
                <MultipleDropDownPicker options={options} optionKey='archetypes' applyPicker={applyFilter} title='Archetype' data={ARCHETYPES} zindex={7} searchable={true} />
            </View>

            <View style={{width: '48%'}} >
                <MultipleDropDownPicker options={options} optionKey='attributes' applyPicker={applyFilter} title='Attribute' data={ATTRIBUTES} zindex={6} />
            </View>
            
            <View style={{width: '48%'}} >
                <MultipleDropDownPicker options={options} optionKey='frametypes' applyPicker={applyFilter} title='Frametype' data={FRAMETYPES} zindex={5} />
            </View>
            
            <View style={{width: '48%'}} >
                <MultipleDropDownPicker options={options} optionKey='races' applyPicker={applyFilter} title='Race' data={RACES} zindex={4} searchable={true} />
            </View>
            
            <View style={{width: '48%'}} >
                <MultipleDropDownPicker options={options} optionKey='types' applyPicker={applyFilter} title='Type' data={CARD_TYPES} zindex={3} searchable={true} />
            </View>
            
            <View style={{width: '48%'}} >
                <SortDropDownPicker options={options} applyPicker={applyFilter} title='Sort'  zindex={2} />                
            </View>
        </View>
    )
}

export default DeckCustomPicker