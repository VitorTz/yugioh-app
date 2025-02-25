import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants';

const { API_KEY } = Constants.expoConfig?.extra || {}
const supabaseUrl = 'https://mlhjkqlgzlkvtqjngzdr.supabase.co'
const supabaseKey = API_KEY


export const supabase = createClient(
    supabaseUrl, 
supabaseKey, {    
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
})


export const fetchUser = async () => {        
    const user = (await supabase.auth.getUser()).data.user
    let { data, error } = await supabase.from('users').select('name, images(image_url)').eq("user_id", user.id).single()
    user.name = data.name
    user.image_url = data.images.image_url        
    return {user: user, err: error}
}
