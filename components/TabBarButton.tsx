import { StyleSheet, Pressable } from 'react-native'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { icons } from '@/helpers/icons'
import { Ionicons } from '@expo/vector-icons'
import React, { useEffect } from 'react'


const TabBarButton = (props: any) => { 
  const {isFocused, label, routeName, color} = props

  const scale = useSharedValue(0)

  useEffect(
    () => {
      scale.value = withSpring(
        typeof isFocused === 'boolean' ?
          (isFocused ? 1 : 0) : isFocused,
          {duration: 500}
      )
    },
    [scale, isFocused]
  )

  const animatedIconStyle = useAnimatedStyle(
    () => {

      const scaleValue = interpolate(
          scale.value,
          [0, 1],
          [1, 1.4]
      )
      
      const top = interpolate(
          scale.value,
          [0, 1],
          [0, 10]
      ) 

      return {
        transform: [{scale: scaleValue}],
        top: top
      }
    }
  )

  const animatedTextStyle = useAnimatedStyle(
    () => {
      
      const opacity = interpolate(
          scale.value,
          [0, 1],
          [1, 0]
      ) 

      return {
        opacity
      }
    }
  )


  return (
    <Pressable {...props} style={styles.container} hitSlop={{left: 10, right: 10, top: 10, bottom: 10}} >
      <Animated.View style={animatedIconStyle} >
        <Ionicons name={icons[routeName]} size={22} color={color} />
      </Animated.View>
       
        <Animated.Text style={[{ color, fontSize: 11 }, animatedTextStyle]}>
          {label}
        </Animated.Text>
       
    </Pressable>
  )
}

export default TabBarButton

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5    
  }
})