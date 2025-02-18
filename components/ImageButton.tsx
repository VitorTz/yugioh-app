import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { Animated } from 'react-native';
import { useRef } from 'react';
import React from 'react'


interface Props {
    onPress: () => any;
    children: React.ReactNode
}

const ImageButton: React.FC<Props> = ({onPress, children}) => {
    // Valor animado inicial para a escala do botão
    const scaleAnim = useRef(new Animated.Value(1)).current;
  
    // Animação ao pressionar o botão (início)
    const handlePressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 1.1, // aumenta a escala em 10%
        useNativeDriver: true,
      }).start();
    };
  
    // Animação ao soltar o botão (fim)
    const handlePressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1, // retorna ao tamanho original
        useNativeDriver: true,
      }).start();
    };
  
    return (        
        <TouchableWithoutFeedback onPressIn={handlePressIn} onPressOut={handlePressOut} onPress={onPress}>
          <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
                {children}
          </Animated.View>
        </TouchableWithoutFeedback>    
    );
  }; 

export default ImageButton

const styles = StyleSheet.create({
    container: {

    }
})