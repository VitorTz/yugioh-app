import { ARCHETYPES, ATTRIBUTES, CARD_TYPES, FRAMETYPES, PICKER_BADGE_DOT_COLORS, RACES } from '@/constants/AppConstants';
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
    zindex
}: {
    title: string,
    options: Map<string, string | string[] | null>,
    optionKey: string,
    applyPicker: () => void,
    data: string[],    
    zindex: number
}) => {
    const [open, setOpen] = useState(false);   
    const [value, setValue] = useState<string[]>([])
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
            multiple={true}
            mode='BADGE'
            badgeProps={{activeOpacity: 0.5}}
            searchable={true}            
            placeholder={title}
            badgeTextStyle={{color: Colors.background}}
            badgeColors={Colors.white}
            badgeDotColors={PICKER_BADGE_DOT_COLORS}
            textStyle={AppStyle.textRegular}            
            onChangeValue={(value) => handlePress(value)}
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
            <CustomDropDownPicker options={options} optionKey='archetype' applyPicker={applyFilter} title='Archetype' data={ARCHETYPES} zindex={5} />
            <CustomDropDownPicker options={options} optionKey='attribute' applyPicker={applyFilter} title='Attribute' data={ATTRIBUTES} zindex={4}/>
            <CustomDropDownPicker options={options} optionKey='frametype' applyPicker={applyFilter} title='Frametype' data={FRAMETYPES} zindex={3}/>
            <CustomDropDownPicker options={options} optionKey='race' applyPicker={applyFilter} title='Race' data={RACES} zindex={2}/>
            <CustomDropDownPicker options={options} optionKey='type' applyPicker={applyFilter} title='Type' data={CARD_TYPES} zindex={1}/>
        </View>
    )
}

export default CustomPicker