import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ImageButton from './ImageButton'
import GoogleIcon from './GoogleIcon'
import GithubIcon from './GithubIcon'
import AppleIcon from './AppleIcon'


interface Props {
    googleOnPress: () => void
    githubOnPress: () => void
    appleOnPress: () => void
}


const ThirdPartyAuth: React.FC<Props> = ({googleOnPress, githubOnPress, appleOnPress}) => {
  return (
    <View style={{width: '100%', flexDirection: 'row', alignContent: "center", justifyContent: "center", columnGap: 10}}>
        <ImageButton onPress={googleOnPress}>
            <GoogleIcon width={32} height={32} color='black'></GoogleIcon>
        </ImageButton>
        <ImageButton onPress={githubOnPress}>
            <GithubIcon width={32} height={32} color='black'></GithubIcon>
        </ImageButton>
        <ImageButton onPress={appleOnPress}>
            <AppleIcon width={32} height={32} color='black'></AppleIcon>
        </ImageButton>
    </View>
  )
}

export default ThirdPartyAuth

const styles = StyleSheet.create({})