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
import { showToast } from '@/helpers/util'
import { sleep } from '@/helpers/sleep'
import Toast from 'react-native-toast-message'
import { toTitleCase } from '@/helpers/util'


const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
      .string()
      .email('Please enter a valid email')
      .required('Email is required'),
  password: yup
      .string()
      .min(8, 'Password must be at least 3 characters')
      .required('Password is required'),
  confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Confirm password is required'),
});


interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;    
}


const SignUp = () => {
  const {context, setContext} = useGlobalState()

  const [isLoading, setLoading] = useState(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: ''            
        },
    });

    const onSubmit = async (form_data: FormData) => {
        setLoading(true)
        
        const {data, error} = await supabase.auth.signUp(
            {
                email:  form_data.email.trimEnd(),
                password: form_data.password.trimEnd(),
                options: {
                    data: {
                        name: toTitleCase(form_data.name.trimEnd())
                    }
                }
            }
        )
        setLoading(false)

        if (error) {
            showToast("Error", error.message, "error")
            return
        }

        setContext(null)
        showToast("Success!", "account created!", "success")
        await sleep(2000)
        router.replace("/(auth)/signin")
    };

  return (
    <SafeAreaView style={AppStyle.safeArea} >
        <View style={{width: '100%', maxWidth: 700, alignItems: "center", justifyContent: "center", height: '100%'}} >
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
                    {/* Name */}
                    <Text style={styles.inputHeaderText}>Name</Text>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}                
                            autoCapitalize="words"
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}/>
                        )}
                    />
                    {errors.name && (<Text style={styles.error}>{errors.name.message}</Text>)}

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

                    {/* Confirm Password */}
                    <Text style={styles.inputHeaderText}>Confirm password</Text>
                    <Controller
                        control={control}
                        name="confirmPassword"
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
                    {errors.confirmPassword && (<Text style={styles.error}>{errors.confirmPassword.message}</Text>)}
                    
                    {/* Register Button */}
                    <Pressable onPress={handleSubmit(onSubmit)} style={styles.formButton} >
                        {
                            isLoading ? 
                            <ActivityIndicator size={32} color={Colors.white} /> :
                            <Text style={styles.formButtonText} >Register</Text>
                        }
                    </Pressable>

                    <View style={{flexDirection: "row", marginTop: 20, gap: 4}} >
                        <Text style={{color: Colors.orange, fontSize: 14}} >Already Have an Account?</Text> 
                        <Pressable onPress={() => router.replace("/(auth)/signin")}  hitSlop={{left: 10, top: 10, bottom: 10, right: 10}} >
                        <Text style={{textDecorationLine: "underline", fontWeight: "bold", color: Colors.orange, fontSize: 14}} >Sign In</Text> 
                        </Pressable>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>

        <Toast/>
    </SafeAreaView>
  )
}

export default SignUp

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