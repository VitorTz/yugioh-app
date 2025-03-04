import { ARCHETYPES, ATTRIBUTES, CARD_TYPES, FRAMETYPES, SORT_DIRECTIONS, PICKER_BADGE_DOT_COLORS, RACES, CARD_SORT_OPTIONS } from '@/constants/AppConstants';
import AppStyle from '@/constants/AppStyle';
import { Colors } from '@/constants/Colors';
import React, {useState} from 'react';
import {View, Text} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';


const CustomDropDownPicker = ({
    title,
    options,
    optionKey,
    applyPicker,
    data,     
    zindex,
    multiple
}: {
    title: string,
    options: Map<string, string | string[] | null>,
    optionKey: string,
    applyPicker: () => void,
    data: string[],    
    zindex: number,    
    multiple: boolean
}) => {
    const [open, setOpen] = useState(false);   
    const [value, setValue] = useState<string[] | null>(multiple ? [] : null)
    const [items, setItems] = useState(data.map((v) => {return {label: v, value: v}}))

    const handlePress = async (value: any) => {
        options.set(optionKey, value)
        await applyPicker()
    }
    
    return (        
        <DropDownPicker            
            zIndex={zindex}            
            open={open}
            style={{backgroundColor: Colors.gray, borderWidth: 1, borderRadius: 4, borderColor: Colors.orange}}
            disabledStyle={{opacity: 0.5}}                             
            items={items}
            setOpen={setOpen}
            theme='DARK'
            value={value}
            setValue={setValue}
            setItems={setItems}
            multiple={multiple}
            mode='BADGE'
            badgeProps={{activeOpacity: 0.5}}
            searchable={true}            
            placeholder={title}
            badgeTextStyle={{color: Colors.background}}
            badgeColors={Colors.white}
            badgeDotColors={PICKER_BADGE_DOT_COLORS}
            textStyle={AppStyle.textRegular}            
            onChangeValue={(value: any) => handlePress(value)}
            dropDownContainerStyle={{backgroundColor: Colors.gray}}
        />            
    );
}


const CustomPicker = ({
    options,
    applyFilter
}: {options: Map<string, string | string[] | null>, applyFilter: () => void}) => {
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

export default CustomPicker