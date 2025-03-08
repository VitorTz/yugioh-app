import { 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    View, 
    Pressable, 
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    ActivityIndicator 
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router'
import { Colors } from '@/constants/Colors'
import AppStyle from '@/constants/AppStyle'
import Toast from 'react-native-toast-message';
import { showToast } from '@/helpers/util';
import { wp, hp, toTitleCase } from '@/helpers/util'
import * as yup from 'yup';
import { AppConstants } from '@/constants/AppConstants'
import { supabase, supaFetchUser } from '@/lib/supabase'
import { UserDB } from '@/helpers/types';
import { useFocusEffect } from '@react-navigation/native';
import PageActivityIndicator from '@/components/PageActivityIndicator';


const schema = yup.object().shape({  
  name: yup
      .string()
      .min(3, 'Name must be at least 3 characters')
      .required('Email is required'),  
});


interface FormData {  
    name: string
}
  

const ProfileInfo = () => {

    const [user, setUser] = useState<UserDB | null>(null)
    const [loadingPage, setLoadingPage] = useState(false)
    const [loading, setLoading] = useState<boolean>(false)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
        defaultValues: {            
            name: '',
        },
    });

    const updatePage = async () => {
        setLoadingPage(true)
        const {data: {session}, error: err} = await supabase.auth.getSession()
        if (session) {
            const usr = await supaFetchUser(session)
            setUser(usr)
        }
        setLoadingPage(false)
    }

    useEffect(
        () => {
            console.log("effect")            
            updatePage()            
        },
        []
    )

    const onSubmit = async (form_data: FormData) => {
          setLoading(true)
        
          const {data: {session}, error: err} = await supabase.auth.getSession()            

          if (session) {
            const { error } = await supabase.from("users").update({"name": toTitleCase(form_data.name.trimEnd())}).eq("user_id", session.user.id)            
            if (error) {
                console.log(error)
                showToast("Error", "", "error")
            } else {                
                showToast("Success", "", "success")
                const usr = await supaFetchUser(session)
                setUser(usr)
            }            
          } 
          
          if (err) {
            console.log(err)
            showToast("Error", "You are not logged!", "error")
          }
          
          setLoading(false)
            
      };
    
    
    return (        
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.background, alignItems: "center", padding: 20}} >
            {
                loadingPage ? 
                <PageActivityIndicator/> :
                <>
                    <View style={{width: '100%', marginBottom: 30, flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}} >
                        <Pressable  onPress={() => router.back()} hitSlop={{left: 20, right: 20, top: 20, bottom: 20}}>
                            <Ionicons name='arrow-back-circle-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
                        </Pressable>
                    </View>     
                    <View style={AppStyle.backdrop}>
                        <Text style={[AppStyle.textHeader, {fontSize: 32, alignSelf: "flex-start"}]} >Account</Text>

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
                                        placeholder={user ? user.name : ""}
                                        placeholderTextColor={Colors.white}                                    
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}/>
                                    )}
                                />
                                {errors.name && (<Text style={styles.error}>{errors.name.message}</Text>)}
                                
                                {/* Login Button */}
                                <Pressable onPress={handleSubmit(onSubmit)} style={styles.formButton} >
                                    {
                                        loading ? 
                                        <ActivityIndicator size={32} color={Colors.white} /> :
                                        <Text style={styles.formButtonText} >Save</Text>
                                    }
                                </Pressable>                        
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </>
            }
            <Toast/>
        </SafeAreaView>
  )
}

export default ProfileInfo

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