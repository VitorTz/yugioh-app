import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import Animated from 'react-native-reanimated';
import { useForm, Controller } from 'react-hook-form';
import React, { useState } from 'react'
import AppStyle from '../../constants/AppStyle'
import { wp, hp, sleep } from '../../helpers/common';
import { Colors } from '../../constants/Colors'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { KeyboardAvoidingView } from 'react-native';
import { supabase } from '../../context/supabase';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';


// Validation schema
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),    
    email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')      
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),    
  });


const SignUp = () => {

  const [isLoading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''      
    },
  });

  const onSubmit = async (form_data) => {
    setLoading(true)
    try {
        const {data, error} = await supabase.auth.signUp(
          {
            email: form_data.email.trimEnd(),
            password: form_data.password.trimEnd(),
            options: {
              data: {
                name: form_data.name.trimEnd()
              }
            }
          }
        )

        setLoading(false)
    
        if (error) {          
          showToast("Error!", error.message)
          return
        }
    
        if (data) {
          showToast("Success!", "Your account has created!")
          await sleep(2000)
          router.replace("(auth)/signin")
        }

      }
      catch (e) {
        console.log(e)
        setLoading(false)
        showToast("Service error!")
        return
      }


  };

  const toastConfig = {
    success: ({text1, text2, props, ...rest}) => {
      return (
        <View style={AppStyle.toast}> 
          <Text style={AppStyle.toastText}>{text1}</Text>
          <Text style={AppStyle.toastText2}>{text2}</Text>
        </View>
      )
    }
  }
  
  const showToast = (title, msg) => {        
      Toast.show(
          {
              type: "success",              
              text1: title,
              text2: msg,              
              position: "top"                
          }
      )
  }

  return (
    <SafeAreaView style={AppStyle.safeArea} >
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, gap: 40, width: '100%'}}>
        <View style={{flexDirection: "row", marginBottom: 40, alignContent: "center", justifyContent: "space-between"}} >
          <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "center"}} > 
            <Text style={{color: Colors.orange, fontWeight: "bold", fontSize: 32}} >Ygo</Text>
            <Text style={{color: "white", fontWeight: "bold", fontSize: 32}} >App</Text>
          </View>
          <Pressable onPress={() => router.replace("(tabs)/database")} style={{alignItems: "center", justifyContent: "center"}} hitSlop={AppStyle.hitSlop}>
            <Text style={{color: Colors.orange, fontWeight: '500', textDecorationLine: "underline"}} >Skip</Text>
          </Pressable>
        </View>

        <View style={AppStyle.form} >
          {/* First Name */}
          <Text style={AppStyle.textInputHeader} >Name</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={AppStyle.input}
                autoCapitalize="words"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          {
            errors.name && (
            <Text style={AppStyle.error}>{errors.name.message}</Text>
          )}

          {/* Email */}
          <Text style={AppStyle.textInputHeader} >Email</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={AppStyle.input}                
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />
          {
            errors.email && (
            <Text style={AppStyle.error}>{errors.email.message}</Text>
          )}

           {/* Password */}
           <Text style={AppStyle.textInputHeader} >Password</Text>
           <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={AppStyle.input}                
                secureTextEntry
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          {
            errors.password && (
            <Text style={AppStyle.error}>{errors.password.message}</Text>
          )}

          {/* Confirm Password */}
          <Text style={AppStyle.textInputHeader} >Confirm Password</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={AppStyle.input}                
                secureTextEntry
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="confirmPassword"
          />
          {
            errors.confirmPassword && (
            <Text style={AppStyle.error}>{errors.confirmPassword.message}</Text>
          )}

          
          {/* submit button */}
          <Pressable onPress={handleSubmit(onSubmit)} style={{width: '100%', alignSelf: "center", justifyContent: "center"}}>
            <Animated.View style={AppStyle.formButton} >
              {
                isLoading ? 
                  <ActivityIndicator size={32} color={Colors.background} />
                  :
                <Text style={{color: Colors.background, fontSize: 20, alignSelf: "center"}} >
                  Login
                </Text>
              }
            </Animated.View>
          </Pressable>

        </View>

        {/* Already have an account */}
        <View style={{flexDirection: "row", gap: 4, marginTop: 30}} >
          <Text style={{color: Colors.orange}} >
            Already Have an Account?
          </Text>
          <Pressable onPress={() => router.replace("(auth)/signin")}  hitSlop={{left: 10, right: 10, top: 10, bottom: 10}} >
            <Text style={{color: Colors.orange, fontWeight:  "bold"}} >
              Sign In
            </Text>
          </Pressable>
        </View>

      </ScrollView>

      <View style={{width: '100%', position: 'absolute'}} >
        <Toast config={toastConfig} visibilityTime={2000} />
      </View>

    </SafeAreaView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: "center",
    justifyContent: "center"    
  }  
})