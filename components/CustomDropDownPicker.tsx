import { StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from '@/constants/Colors'
import { PICKER_BADGE_DOT_COLORS } from '@/constants/AppConstants'
import AppStyle from '@/constants/AppStyle'
import { useState } from 'react'
import React from 'react'

const CustomDropDownPicker = ({
    title,
    options,
    optionKey,
    applyPicker,
    data,     
    zindex,
    multiple,
    badgeDotColors
}: {
    title: string,
    options: Map<string, string | string[] | null>,
    optionKey: string,
    applyPicker: () => void,
    data: string[],    
    zindex: number,    
    multiple: boolean,
    badgeDotColors?: string[]
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
            badgeDotColors={badgeDotColors ? badgeDotColors : PICKER_BADGE_DOT_COLORS}
            textStyle={AppStyle.textRegular}            
            onChangeValue={(value: any) => handlePress(value)}
            dropDownContainerStyle={{backgroundColor: Colors.gray}}
        />            
    );
}

export default CustomDropDownPicker

const styles = StyleSheet.create({})