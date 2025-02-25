import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import Constants from 'expo-constants';

const { API_KEY } = Constants.expoConfig?.extra || {}
const supabaseUrl = 'https://mlhjkqlgzlkvtqjngzdr.supabase.co'
const supabaseKey = API_KEY

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
})


export const fetchUserId = async () => {
    return await supabase.auth.getSession().data.session.user.id
}

export const fetchUser = async () => {    
    const { data: { user } } = await supabase.auth.getUser()
    const {data, error} = await supabase.from("users").select("name").eq("user_id", user.id).single()
    user.name = data.name
    return user
}
