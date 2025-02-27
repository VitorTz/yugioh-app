import { 
  SafeAreaView, 
  Pressable, 
  ScrollView,
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  KeyboardAvoidingView
} from 'react-native'
import React from 'react'
import { useState } from 'react'
import AppStyle from '@/constants/AppStyle'
import { Colors } from '@/constants/Colors'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGlobalState } from '@/context/GlobalContext';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';


const schema = yup.object().shape({  
  email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  password: yup
      .string()
      .min(3, 'Password must be at least 3 characters')
      .required('Password is required'),  
});


interface FormData {  
  email: string;
  password: string;  
}


const SignIn = () => {
  const {context, setContext} = useGlobalState()

  const [isLoading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {            
            email: '',
            password: '',            
        },
    });

    const onSubmit = async (form_data: FormData) => {
        console.log(form_data)
    };

  return (
    <SafeAreaView style={AppStyle.safeArea} >
      
      <View style={{width: '100%', flexDirection: "row", justifyContent: "space-between", alignItems: "center"}} >
          <View style={{flexDirection: "row", marginVertical: 30}} >
            <Text style={{fontSize: 38, color: Colors.orange, fontWeight: "bold"}} >Ygo</Text>
            <Text style={{fontSize: 38, color: Colors.white, fontWeight: "bold"}} >App</Text>
          </View>
          <Pressable onPress={() => router.replace("/(tabs)/database")} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} >
            <Text style={{textDecorationLine: "underline", color: Colors.orange}} >Skip</Text> 
          </Pressable>
      </View>

      <KeyboardAvoidingView style={{width: '100%'}} >
        <ScrollView style={{width: '100%'}} >
            {/* Email */}
            <Text style={styles.inputHeaderText}>Email</Text>
              <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                      style={styles.input}                    
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}/>
                  )}
              />
              {errors.email && (<Text style={styles.error}>{errors.email.message}</Text>)}
              
              {/* Password */}
              <Text style={styles.inputHeaderText}>Password</Text>
              <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                      style={styles.input}                    
                      secureTextEntry
                      autoCapitalize="none"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}/>
                  )}
              />
              {errors.password && (<Text style={styles.error}>{errors.password.message}</Text>)}
      
              {/* Login Button */}
              <Pressable onPress={handleSubmit(onSubmit)} style={styles.formButton} >
                  {
                      isLoading ? 
                      <ActivityIndicator size={32} color={Colors.white} /> :
                      <Text style={styles.formButtonText} >Login</Text>
                  }
              </Pressable>

        </ScrollView>
      </KeyboardAvoidingView>

    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.gray1,
    height: 50,
    fontSize: 18,
    paddingHorizontal: 10,
    color: Colors.white,
    fontFamily: "LeagueSpartan_400Regular",
    marginBottom: 10
  },
  inputHeaderText: {
      color: Colors.white,
      fontSize: 20,
      fontFamily: "LeagueSpartan_400Regular",
      marginBottom: 10
  },
  error: {
      color: Colors.orange,
      alignSelf: "flex-start",
      fontSize: 14,
      fontFamily: "LeagueSpartan_200ExtraLight"
  },
  formButton: {
      width: '100%',
      marginTop: 10,
      alignItems: "center",
      justifyContent: "center",
      height: 50,
      borderRadius: 4,
      backgroundColor: Colors.orange
  },
  formButtonText: {
      color: Colors.white,
      fontSize: 22,
      fontFamily: "LeagueSpartan_400Regular",
  }
})