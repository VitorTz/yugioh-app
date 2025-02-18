import { Pressable, ScrollView, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AppStyle from '@/constants/AppStyle'
import AppLogo from '@/components/AppLogo'
import SnackBar from '@/components/SnackBar'
import sleep from '../util/sleep'
import HorizontalMessage from '@/components/HorizontalMessage'
import ThirdPartyAuth from '@/components/ThirdPartyAuth'


interface LoginProps {
    showMessage: (message: string) => void;
}

const LoginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required")
});


const LoginForm: React.FC<LoginProps> = ({showMessage}) => {

    const [loading, setLoading] = useState(false);
    
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(LoginSchema),
    });

    const onSubmit = async (form_data: any) => {
        setLoading(true)
        await sleep(1000)
        setLoading(false)
    };

    const googleLogin = async() => {
        console.log("google")
    }   

    const githubLogin = async() => {
        console.log("github")
    }

    const appleLogin = async() => {
        console.log("apple")
    }

    
    return (
        <ScrollView style={{flex: 1, width: '100%', marginTop: 40}}> 
            
            <View style={{alignSelf: "flex-start", marginBottom: 20}}>
                <Text style={{fontWeight: "bold", fontSize: 32, color: Colors.pinkAccent}} >Login</Text>
            </View>

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                <>
                    {errors.email && <Text style={AppStyle.errorText}>{errors.email.message}</Text>}
                    <TextInput
                    style={AppStyle.textInput}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                    />
                </>
                )}
            />

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                <>
                    {errors.password && <Text style={AppStyle.errorText}>{errors.password.message}</Text>}
                    <TextInput
                    style={AppStyle.textInput}
                    placeholder="Password"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    />
                </>
                )}
            />

        <Pressable style={AppStyle.button} onPress={handleSubmit(onSubmit)}>
            {
                loading ?
                (<ActivityIndicator color={Colors.white} ></ActivityIndicator>) :
                (<Text style={AppStyle.buttonText}>Register</Text>)
            }
        </Pressable>

        <HorizontalMessage message='or sign with'></HorizontalMessage>

        <ThirdPartyAuth googleOnPress={googleLogin} githubOnPress={githubLogin} appleOnPress={appleLogin}></ThirdPartyAuth>
            
        </ScrollView>
    )
}

const SkipButton = () => {
    return (
        <Pressable onPress={() => router.replace("/(tabs)/home")} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Text style={{textDecorationLine: "underline", marginTop: 10}}>Skip</Text>
        </Pressable>
    )
}


const SignIn = () => {

    const [snackVisible, snackSetVisible] = useState(false);
    const [snackMessage, snackSetMessage] = useState('');

    const showMessage = async (message: string) => {
        snackSetVisible(true)
        snackSetMessage(message)        
        await sleep(2000)        
        snackSetVisible(false)        
    }

    
    return (
        <SafeAreaView style={AppStyle.safeArea}>        
            <View style={{width: '100%', alignItems: "center", justifyContent: "space-between", flexDirection: "row"}}>
                <AppLogo></AppLogo>
                <SkipButton></SkipButton>
            </View>

            <LoginForm showMessage={showMessage}></LoginForm>

            <SnackBar visible={snackVisible} message={snackMessage}></SnackBar>
        </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({})