import React, { useState } from 'react'
import { 
  ActivityIndicator, 
  Pressable, 
  SafeAreaView, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput, 
  View,
  AppState
} from 'react-native'
import { useForm, Controller } from 'react-hook-form';
import Animated from 'react-native-reanimated';
import AppStyle from '../../constants/AppStyle'
import { wp, hp, sleep } from '../../helpers/common';
import { Colors } from '../../constants/Colors'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { fetchUser, supabase } from '../../context/supabase';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';


// Validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});



const SignIn = () => {

  const [isLoading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (form_data) => {
    setLoading(true);
    const {data, error} = await supabase.auth.signInWithPassword({
      email: form_data.email,
      password: form_data.password
    })
    setLoading(false);

    if (error) {
      showToast("Error!", error.message)
    }
    
    if (data.session) {
      const {response, err} = await fetchUser()
      showToast("Success!", `Welcome, ${response.name}`)
      await sleep(2000)
      router.replace("(tabs)/database")
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
            errors.email && 
            (<Text style={AppStyle.error}>{errors.email.message}</Text>)
          }

          <Text style={AppStyle.textInputHeader}>Password</Text>

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
            errors.password && 
            (<Text style={AppStyle.error}>{errors.password.message}</Text>)
          }
            
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

        <View style={{flexDirection: "row", gap: 4, marginTop: 30}} >
          <Text style={{color: Colors.orange}} >
            Don`t have an Account?
          </Text>
          <Pressable onPress={() => router.replace("(auth)/signup")}  hitSlop={{left: 10, right: 10, top: 10, bottom: 10}} >
            <Text style={{color: Colors.orange, fontWeight:  "bold"}} >
              Sign Up
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

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: "center",
    justifyContent: "center"    
  }
})