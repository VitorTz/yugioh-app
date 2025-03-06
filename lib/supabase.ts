import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthError, createClient, PostgrestError, Session } from '@supabase/supabase-js'
import { GlobalContext, ImageDB, UserDB, YuGiOhCard, YuGiOhDeck } from '@/helpers/types'
import { CARD_FETCH_LIMIT, DECK_FETCH_LIMIT } from '@/constants/AppConstants'


const SUPABASE_URL = process.env.EXPO_PUBLIC_API_URL ? process.env.EXPO_PUBLIC_API_URL : ""
const SUPABASE_KEY = process.env.EXPO_PUBLIC_API_KEY ? process.env.EXPO_PUBLIC_API_KEY : ""


const EQ_COMP = [
  "archetype",
  "attribute",
  "frametype",
  "race",
  "type"
]


export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? AsyncStorage : undefined,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

export async function supaFetchUser(session: Session): Promise<UserDB | null> {  
    const {data, error} = await supabase.from(
      "users"
    ).select(
      `
        user_id,
        name,
        image_id,
        images (image_url)
      `
    ).eq("user_id", session.user.id).single()
    if (error) { return null }    
    return {      
        user_id: data.user_id,
        name: data.name,
        image: {
          image_id: data.image_id,
          image_url: data.images.image_url
        }
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


export async function supaFechGlobalContext(session: Session): Promise<GlobalContext | null> {
  if (!session) { return null }
  const user = await supaFetchUser(session)
  if (!user) { return null }
  const icons = await supaFetchProfileIcons()
  return {
    user: user,    
    profileIcons: icons,
    session: session
  }
}

export async function supaAddDeckToUser(deck_id: number): Promise<{success: boolean, error: PostgrestError | AuthError | null}> {
  const {data: {session}, error: err} = await supabase.auth.getSession()
  if (err) {
    console.log(err.message)
    return {success: false, error: err}
  }  
  const {data, error} = await supabase.from("user_decks").insert(
    [{"user_id": session!.user.id, "deck_id": deck_id}]
  ).select()
  return {success: error ? false : true, error: error}  
}

export async function supaAddCardToCollection(card_id: number, total: number) {
  const {data: {session}, error: err} = await supabase.auth.getSession()
  if (err) {
    console.log(err.message)
    return {success: false, error: err}
  } 
  // sum if already exists or insert if not
  const {data, error} = await supabase.from("user_cards").insert(
    [{"user_id": session!.user.id, "card_id": card_id, "total": total}]
  ).select()
  return {success: error ? false : true, error: error}  
}


export async function supaFetchCardsFromDeck(deck_id: number): Promise<YuGiOhCard[]> {
    const {data, error} = await supabase.from("deck_cards").select(
      `
      num_cards,
      cards (
        card_id,
        name,
        descr,
        color,
        attack,
        defence,
        level,
        attribute,
        archetype,
        frametype,
        race,
        type,
        image_url,
        cropped_image_url
      )
      `
    ).eq("deck_id", deck_id).overrideTypes<YuGiOhCard[]>()
    let cards: YuGiOhCard[] = []
    data?.forEach(item => {
      for (let i = 0; i < item.num_cards; i++) {
        cards.push(item.cards)
      }
    })
    cards.sort((a, b) => {
        if (a.name < b.name)
          return -1
        if (a.name == b.name)
          return 0
        return 1
      }
    )
    return cards
}


export async function supaFetchCards(
  searchTxt: string | null,
  options: Map<any, any>,
  page: number
): Promise<{data: YuGiOhCard[], error: PostgrestError | null}> {
  let query = supabase.from('cards').select(`
    card_id,
    name,
    descr,
    color,
    attack,
    defence,
    level,
    attribute,
    archetype,
    frametype,
    race,
    type,
    image_url,
    cropped_image_url
  `
  )

  if (searchTxt) {
    query = query.ilike("name", `%${searchTxt}%`)
  }  

  EQ_COMP.forEach(
    (value) => {
      if (options.get(value)) {
        const s = options.get(value).map((item: string) => `${value}.eq.${item}`).join(',')        
        if (s) {
          query = query.or(s)
        }
      }
    }
  )

  const orderBy = options.get("sort")  
  if (orderBy) {
    query = query.order(
      orderBy ? orderBy : "name",
      {ascending: options.get("sortDirection") != "DESC", nullsFirst: false}
    )
  }

  query = query.range(page * CARD_FETCH_LIMIT, ((page + 1) * CARD_FETCH_LIMIT) - 1)
  
  const {data, error} = await query.overrideTypes<YuGiOhCard[]>()
  return {data: data ? data : [], error: error}  
}


export const supaFetchDecks = async (
  searchTxt: string | null,
  options: Map<any, any>, 
  page: number
): Promise<{data: YuGiOhDeck[], error: PostgrestError | null}> => {
  let query = supabase.from("decks").select(`
    deck_id,
    name,
    type,
    image_url,    
    num_cards,    
    archetypes,
    attributes,
    frametypes,
    races,
    types
  `)
    
  console.log(searchTxt, options)  

  if (searchTxt) {
    query = query.ilike("name", `%${searchTxt}%`)
  }

  if (options.has('archetypes')) {
      options.get('archetypes').forEach(
      (value: string) => {
        query = query.contains('archetypes', [value])
      }
    )
  }

  if (options.has('attributes')) {
      options.get('attributes').forEach(
      (value: string) => {
        query = query.contains('attributes', [value])
      }
    )
  }

  if (options.has('frametypes')) {
      options.get('frametypes').forEach(
      (value: string) => {
        query = query.contains('frametypes', [value])
      }
    )
  }

  if (options.has('races')) {
      options.get('races').forEach(
      (value: string) => {
        console.log("races", value)
        query = query.contains('races', [value])
      }
    )
  }

  if (options.has('types')) {
      options.get('types').forEach(
      (value: string) => {
        query = query.contains('types', [value])
      }
    )
  }  

  const {data, error} = await query.order(
    'name', {ascending: true}
  ).range(
    page * DECK_FETCH_LIMIT, 
    (page * DECK_FETCH_LIMIT) + DECK_FETCH_LIMIT - 1
  ).overrideTypes<YuGiOhDeck[]>()

  return {data: data ? data : [], error: error}
  
}