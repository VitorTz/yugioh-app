import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthError, createClient, PostgrestError } from '@supabase/supabase-js'
import { ImageDB, ProfileInfo, YuGiOhCard } from '@/helpers/types'
import { Platform } from 'react-native'

const SUPABASE_URL = process.env.EXPO_PUBLIC_API_URL
const SUPABASE_KEY = process.env.EXPO_PUBLIC_API_KEY
const CARD_FETCH_LIMIT = Platform.OS === "web" ? 40 : 20

type CARD_STRING_COLUMN = "name" | "attribute" | "archetype" | "frametype" | "type" | "race"

export interface FetchCardOptions {
  name: CARD_STRING_COLUMN | null
  card_id: number | null
  
  attack: number | null
  attackGE: boolean | null
  attackGEQ: boolean | null

  defence: number | null
  defenceGE: boolean | null
  defenceGEQ: boolean | null

  level: number | null
  levelGE: boolean | null
  levelGEQ: boolean | null

  attribute: CARD_STRING_COLUMN | null
  archetype: CARD_STRING_COLUMN | null
  frametype: CARD_STRING_COLUMN | null
  type: CARD_STRING_COLUMN | null
  race: CARD_STRING_COLUMN | null 
}



const STRING_COMPS: CARD_STRING_COLUMN[] = [
  "name",
  "attribute",
  "archetype",
  "frametype",
  "type",
  "race"
]


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
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
  

export async function supaFetchProfileIcons(): Promise<{allProfileIcons: ImageDB[]}> {
  const {data, error} = await supabase.from("profile_icons").select("image_id, images (image_url)")  
  if (data) {
    const icons: ImageDB[] = data.map(
      (item) => {return {imageId: item.image_id, imageUrl: item.images.image_url}}
    )
    return {allProfileIcons: icons}
  }
  if (error) {
    console.log(error.message)
  }
  return {allProfileIcons: []}
}


export async function supaFetchCards(
  page: number, 
  options: FetchCardOptions | null = null
): Promise<{cards: YuGiOhCard[], error: PostgrestError | null}> {
  let query = supabase.from('cards').select(`
    card_id,
    name,
    descr,
    attack,
    defence,
    level,
    attribute,
    archetype,
    frametype,
    race,
    type,
    image_url`  
  )

  if (options && options.card_id) {
    query = query.eq("card_id", options.card_id)
    query = query.order("name", {ascending: true}).range(page * CARD_FETCH_LIMIT, (page + 1) * CARD_FETCH_LIMIT)
    const {data, error} = await query.overrideTypes<YuGiOhCard[]>()
    return {cards: data ? data : [], error: error}
  }


  if (options) {

      STRING_COMPS.forEach(
        (item) => {
          if (options[item] != null) {
            query = query.ilike(item, options[item])
          }
        }
      )
  }

  query = query.order("name", {ascending: true}).range(page * CARD_FETCH_LIMIT, (page + 1) * CARD_FETCH_LIMIT)
  const {data, error} = await query.overrideTypes<YuGiOhCard[]>()
  return {cards: data ? data : [], error: error}  
}