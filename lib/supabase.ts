import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, PostgrestError, Session } from '@supabase/supabase-js'
import { ColorDB, GlobalContext, ImageDB, UserDB, YuGiOhCard } from '@/helpers/types'
import { FetchCardOptions, CARD_STRING_COLUMN } from '@/helpers/types'


const SUPABASE_URL = process.env.EXPO_PUBLIC_API_URL ? process.env.EXPO_PUBLIC_API_URL : ""
const SUPABASE_KEY = process.env.EXPO_PUBLIC_API_KEY ? process.env.EXPO_PUBLIC_API_KEY : ""
const CARD_FETCH_LIMIT = 60


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

export async function supaFetchUser(user_id: string): Promise<UserDB | null> {  
    const {data, error} = await supabase.from(
      "users"
    ).select(`
      user_id,
      name, 
      image_id,
      accent_color, 
      base_color,
      images (image_url)`
    ).eq("user_id", user_id).single().overrideTypes<UserDB>()    
    if (error) { return null }    
    return {      
        user_id: data.user_id,
        name: data.name,
        image: {
          image_id: data.image_id,
          image_url: data.images.image_url
        },        
        accent_color: data.accent_color,
        base_color: data.base_color
    }
  }
  

export async function supaFetchProfileIcons(): Promise<ImageDB[]> {
  const {data, error} = await supabase.from("profile_icons").select("image_id, images (image_url)").overrideTypes<ImageDB[]>()
  if (!data) { return [] }
  return data.map(
    (item) => {
      return {
        image_id: item.image_id,
        image_url: item.images.image_url
      }
    }
  )
}


export async function supaFetchColors(): Promise<ColorDB[]> {  
  const {data, error} = await supabase.from("colors").select("name, hex_value").overrideTypes<ColorDB[]>()  
  return data ? data : []
}


export async function supaFechGlobalContext(session: Session): Promise<GlobalContext | null> {
  if (!session) { return null }
  const user = await supaFetchUser(session.user.id)    
  if (!user) { return null }  
  const colors = await supaFetchColors()
  const icons = await supaFetchProfileIcons()
  return {
    user: user,
    colors: colors,
    profileIcons: icons,
    session: session
  }
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
            console.log(item, options[item])            
            query = query.ilike(item, `%${options[item]}%`)
          }
        }
      )
  }

  query = query.order("name", {ascending: true}).range(page * CARD_FETCH_LIMIT, ((page + 1) * CARD_FETCH_LIMIT) - 1)
  const {data, error} = await query.overrideTypes<YuGiOhCard[]>()
  return {cards: data ? data : [], error: error}  
}