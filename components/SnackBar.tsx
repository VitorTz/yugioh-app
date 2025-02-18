import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors';


interface Props {
    visible: any;
    message: string;
}


const SnackBar: React.FC<Props> = ({visible, message}) => {
  return (
    <View style={{position: 'absolute', bottom: 10, width: '100%'}}>
        {
            visible && 
            <View style={styles.container}>
                <Text style={styles.text} >{message}</Text>
            </View>
        }        
    </View>
  )
}


export default SnackBar

const styles = StyleSheet.create({
    container: {        
        borderRadius: 4,
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%",        
        backgroundColor: Colors.black,
        paddingHorizontal: 14,
        paddingVertical: 16
    },
    text: {
        color: Colors.white
    }
})