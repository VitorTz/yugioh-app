import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { ProfileInfo } from '@/helpers/types'

const supabaseUrl = process.env.EXPO_PUBLIC_API_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_API_KEY


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export async function supaFetchUserProfileInfo(user_id: string): Promise<{userInfo: ProfileInfo | null}> {    
    const {data, error} = await supabase.from("users").select("name, image_id, images (image_url)").eq("user_id", user_id).single()
    if (error) {
      return {userInfo: null}
    }
  
    return {
      userInfo: {
        name: data.name,
        profilePhoto: {
            imageId: data.image_id,
            imageUrl: data.images.image_url
        }        
      }
    }
  }
  