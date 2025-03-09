import { Pressable, Switch, TextInput, SafeAreaView, StyleSheet, Text, View, ActivityIndicator, Keyboard } from 'react-native'
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated'
import React, { useRef, useState } from 'react'
import AppStyle from '@/constants/AppStyle'
import { Colors } from '@/constants/Colors'
import { AppConstants } from '@/constants/AppConstants'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import removeTrailingNewlines, { hp, showToast } from '@/helpers/util'
import Editor from '@/components/dom-components/hello-dom'
import Toast from 'react-native-toast-message'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'
import { sleep } from '@/helpers/sleep'
import { ScrollView } from 'react-native-gesture-handler'
import { isDelete } from 'lexical/LexicalUtils'
import CardSearch from '@/components/CardSearch'


const schema = yup.object().shape({  
  name: yup
      .string()
      .min(3, 'Name must be at least 3 characters')
      .required('Name is required'),
});


interface FormData {  
  name: string
}


const CreateDeck = () => {

  const [plainText, setPlainText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const [isPublic, setIsPublic] = useState(false);
  const toggleSwitch = () => setIsPublic(previousState => !previousState);
  
  const [editorState, setEditorState] = useState<string | null>(null)
  const [deckExists, setDeckExists] = useState(false)
  const [deckName, setDeckName] = useState('')
  const deckId = useRef<number | null>(null)


  const addCards = () => {
    router.replace("/(tabs)/database")
  }

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

  
  const handleCreate = async (form_data: FormData, session: Session) => {    
    const {data: deckData, error: err} = await supabase.from("decks").insert(
      [{
        "type": "Community", 
        "name": form_data.name.trimEnd(),
        "is_public": isPublic,
        "descr": plainText != '' ? removeTrailingNewlines(plainText.trimEnd()) : null,
        "archetypes": [],
        "attributes": [],
        "frametypes": [],
        "races": [],
        "types": []
      }]
    ).select("deck_id").single()

    if (err) {
      console.log(err)
      showToast("Error", "Failed to create deck", 'error')
      return
    }

    if (deckData) {          
      const {data, error} = await supabase.from(
        "user_decks"
      ).insert([{
        "user_id": session.user.id, 
        "deck_id": deckData.deck_id
      }])
      if (error == null) {
        showToast("Success", "Deck created!", "success")
        deckId.current = deckData.deck_id
        setDeckName(form_data.name.trimEnd())
        setDeckExists(true)
      } else {
        console.log(error)
        showToast("Error", "Failed to create deck", 'error')
      }
    }    
  }

  const handleEdit = async (form_data: FormData, session: Session) => {

    if (deckId.current == null) {
      showToast("Error", "Failed to retrieve deck id", "error")
      return
    }

    const {data, error} = await supabase.from("decks").update(
      {
        "name": form_data.name.trimEnd(),
        "is_public": isPublic,
        "descr": plainText != '' ? removeTrailingNewlines(plainText.trimEnd()) : null
      }
    ).eq("deck_id", deckId.current)

    if (error == null) {
      showToast("Success", "Deck updated!", "success")      
      setDeckName(form_data.name.trimEnd())
    }

  }

  const onSubmit = async (form_data: FormData) => {
    Keyboard.dismiss()
    if (plainText.length > 1000) {
      showToast("Error", "Description is too long! Max 1000 characters", "error")
      return
    }
    setIsLoading(true)
    const {data: {session}, error: authError} = await supabase.auth.getSession()
      if (authError) {
        showToast("Error", "You are not logged!", "error")        
        setIsLoading(false)
        return
    }
    if (session) {
      deckExists ? await handleEdit(form_data, session) : await handleCreate(form_data, session)
    }
    setIsLoading(false)
  };

  const deleteDeck = async () => {
    setIsDeleting(true)
    if (deckId.current == null) {
      showToast("Error", "Failed to retrieve deck id!", "error")
      setIsDeleting(false)
      return
    }

    const {data: {session}, error: authError} = await supabase.auth.getSession()

    if (authError) {
      console.log(authError)
      showToast("Error", "You are not logged!", "error")
      setIsDeleting(false)
      return
    }

    if (session) {
      const {data, error} = await supabase.from("decks").delete().eq("deck_id", deckId.current)
      if (error == null) {
        showToast("Success!", "Deck Deleted!", "success")
        Keyboard.dismiss()
        await sleep(1000)
        setIsPublic(false)
        setDeckExists(false)
        setDeckName('')        
        deckId.current = null
      } else {
        console.log(error)
        showToast("Error!", "Server error!", "error")
      }
    }

    setIsDeleting(false)
  }
 
  return (
    <SafeAreaView style={{flex: 1, padding: 20, backgroundColor: Colors.background}} >            
      <ScrollView style={{flex: 1}} >
        <View style={{width: '100%', height: 40, alignItems: "center", justifyContent: "space-between", flexDirection: "row", marginBottom: 10}} >
          {
            !deckExists && 
            <Text style={AppStyle.textHeader}>Create Deck</Text>
          }
          {
            deckExists &&
            <Animated.View entering={FadeInLeft.delay(50).duration(600)} >
                <Text style={AppStyle.textHeader}>Edit Deck</Text>
            </Animated.View>
          }        
          <Pressable onPress={() => router.back()}  hitSlop={AppConstants.hitSlopLarge} >
              <Ionicons name='arrow-back-circle-outline' size={AppConstants.icon.size} color={AppConstants.icon.color} />
          </Pressable>          
        </View>

        {
          deckExists && deckName &&        
            <Animated.View entering={FadeInLeft.delay(50).duration(600)} style={{gap: 20, alignItems: "center", marginVertical: 10}} >
              <Text style={AppStyle.textHeader}>{deckName}</Text>
              <View style={{width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: "center", gap: 10}} >  
                <View style={{flex: 1, height: 2, backgroundColor: Colors.orange}} ></View>
                <Ionicons name="layers-outline" size={20} color={Colors.orange} />
                <View style={{flex: 1, height: 2, backgroundColor: Colors.orange}} ></View>
              </View>            
            </Animated.View>        
        }

        <View style={{width: '100%', gap: 10, marginBottom: 10}} >
          <Text style={AppStyle.textHeader}>Name{deckExists ? '' : ' *'}</Text>
          <Controller
            control={control}          
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput              
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}/>
            )}/>
            {errors.name && (<Text style={styles.error}>{errors.name.message}</Text>)}
        </View>
        
        <Text style={AppStyle.textHeader}>Description</Text>
        <View style={{width: '100%', height: 240}} >
            <Editor setPlainText={setPlainText}  setEditorState={setEditorState}  />
        </View>
      
        <View style={{width: '100%', flexDirection: 'row', alignItems: "center", justifyContent: 'flex-start'}} >
          <Text style={[AppStyle.textRegular, {color: Colors.orange}]}>Is public deck?</Text>
          <Switch
            trackColor={{false: '#767577', true: '#767577'}}
            thumbColor={isPublic ? Colors.orange : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isPublic}
          />
        </View>        

        {
          !deckExists &&
          <Pressable onPress={handleSubmit(onSubmit)} style={{width: '100%', height: 50, backgroundColor: Colors.orange, alignItems: "center", justifyContent: "center"}} >
            {
              isLoading ? 
              <ActivityIndicator size={32} color={Colors.white}/> :
              <Text style={[AppStyle.textRegular, {fontSize: 20}]}>Create</Text>
            }
          </Pressable>
        }

        {
          deckExists &&
          <View style={{width: '100%', gap: 10}} >
            <View style={{flexDirection: 'row', gap: 10}} >              
              <Animated.View entering={FadeInLeft.delay(50).duration(600)} style={{flex: 1}} >
                  <Pressable onPress={addCards} style={{height: 50, backgroundColor: Colors.orange, alignItems: "center", justifyContent: "center"}} >
                    <Text style={[AppStyle.textRegular, {fontSize: 18}]}>Add Cards</Text>
                  </Pressable>
              </Animated.View>
              <Animated.View entering={FadeInRight.delay(50).duration(600)} style={{flex: 1}} >
                <Pressable onPress={handleSubmit(onSubmit)} style={{width: '100%', height: 50, backgroundColor: Colors.orange, alignItems: "center", justifyContent: "center"}} >
                  {
                    isLoading ? 
                    <ActivityIndicator size={32} color={Colors.white}/> :
                    <Text style={[AppStyle.textRegular, {fontSize: 18}]}>Save changes</Text>
                  }
                </Pressable>
              </Animated.View>          
            </View>
            <Animated.View entering={FadeInDown.delay(50).duration(600)} style={{flex: 1}} >
            <Pressable onPress={deleteDeck} style={{width: '100%', height: 50, backgroundColor: Colors.red, alignItems: "center", justifyContent: "center"}} >
              {
                isDeleting ? 
                <ActivityIndicator size={32} color={Colors.white}/> :
                <Text style={[AppStyle.textRegular, {fontSize: 18}]}>Delete</Text>
              }
            </Pressable>
          </Animated.View>
          </View>
        }


      </ScrollView>

      <Toast/>
    </SafeAreaView>
  )
}

export default CreateDeck

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderRadius: 4,
    backgroundColor: Colors.gray,
    color: Colors.white,
    paddingHorizontal: 10
  },
  error: {
    fontSize: 14,
    color: Colors.orange,
    alignSelf: "flex-start",
    fontFamily: "LeagueSpartan_200ExtraLight"
  }
})