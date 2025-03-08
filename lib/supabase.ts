import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthError, createClient, PostgrestError, Session } from '@supabase/supabase-js'
import { GlobalContext, ImageDB, UserDB, YuGiOhCard, YuGiOhDeck, YuGiOhUserCard, YuGiOhUserDeck } from '@/helpers/types'
import { CARD_FETCH_LIMIT, DECK_FETCH_LIMIT, DECK_TYPES } from '@/constants/AppConstants'


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

export async function supaRmvDeckFromUser(deck_id: number): Promise<{success: boolean, error: AuthError | null}> {
  const {data: {session}, error: err} = await supabase.auth.getSession()
  if (err) {    
    return {success: false, error: err}
  }  
  
  const response = await supabase.from("user_decks").delete().eq("deck_id", deck_id).eq("user_id", session!.user.id)
  return {success: response.status == 204, error: null}
}

export async function supaGetUseMissingCardInDeck(deck_id: number): Promise<{cards: {card_id: string, name: string}[], error: AuthError | PostgrestError | null}> {
  const {data: {session}, error: err} = await supabase.auth.getSession()
  if (err) {    
    return {cards: [], error: err}
  }
  const { data, error } = await supabase.rpc('get_user_missing_cards', {
    p_deck_id: deck_id,
    p_user_id: session!.user.id
  })

  data.sort((a: {card_id: string, name: string}, b: {card_id: string, name: string}) => {
      if (a.name < b.name) {
        return -1
      } else if (a.name == b.name) {
        return 0
      }
      return 1
  })
  return {cards: data, error: error}
}

export async function supaAddCardToCollection(card_id: number, total: number) {
  const {data: {session}, error: err} = await supabase.auth.getSession()
  if (err) {
    console.log(err.message)
    return {success: false, error: err}
  }
  const { error } = await supabase.rpc('insert_user_card', {
    p_card_id: card_id,
    p_user_id: session!.user.id,
    p_quantity: total
  })  
  return {success: error ? false : true, error: error}  
}

export async function supaRmvCardFromCollection(card_id: number, total: number) {
  const {data: {session}, error: err} = await supabase.auth.getSession()
  if (err) {
    console.log(err.message)
    return {success: false, error: err}
  }
  const { error } = await supabase.rpc('remove_user_card', {
    p_card_id: card_id,
    p_user_id: session!.user.id,
    p_quantity: total
  })
  return {success: error ? false : true, error: error}  
}


export async function supaUserHasDeck(deck_id: number): Promise<{result: boolean, error: AuthError | PostgrestError | null}> {
  const {data: {session}, error: err} = await supabase.auth.getSession()
  if (err) {
    console.log(err.message)
    return {result: false, error: err}
  }

  const {data, error} = await supabase.from("user_decks").select("deck_id").eq("deck_id", deck_id).eq("user_id", session!.user.id).single()
  if (error && error.code == "PGRST116") {
    return {result: false, error: error}
  }  
  return {result: true, error: error}
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

export async function supaFetchUserCards(session: Session): Promise<{data: YuGiOhUserCard[], error: AuthError | PostgrestError | null}> {  
  const {data, error} = await supabase.from('user_cards').select(`
    total,
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
  ).eq("user_id", session.user.id)
  let cards: YuGiOhUserCard[] = data ? data : []
  cards.sort(
    (a: YuGiOhUserCard, b: YuGiOhUserCard) => {
      if (a.cards.name < b.cards.name) {
        return -1
      }
      if (a.cards.name == b.cards.name) {
        return 0
      }
      return 1
    }
  )
  return {data: cards, error}
}

export async function supaFetchUserDecks(session: Session): Promise<{data: YuGiOhUserDeck[], error: PostgrestError | null}> {
  const {data, error} = await supabase.from("user_decks").select(
    `
      deck_id,
      decks (
        name,
        image_url,
        num_cards,
        archetypes,
        attributes,
        frametypes,
        races,
        types,
        type
      )
    `
  ).eq("user_id", session.user.id)

  const decks: YuGiOhUserDeck[] = data ? data.map(
    item => {
      return {
        deck_id: item.deck_id, 
        name: item.decks.name,
        image_url: item.decks.image_url,
        num_cards: item.decks.num_cards,
        type: item.decks.type,
        archetypes: item.decks.archetypes,
        attributes: item.decks.attributes,
        frametypes: item.decks.frametypes,
        races: item.decks.races,
        types: item.decks.types
      }
    }
  ) : []
  return {data: decks, error: error}
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

  query = query.eq("is_public", true)  

  query = query.gte("num_cards", 1)

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

  if (options.has('deckType')) {
    const t: string = options.get('deckType')
    if (t != "Any" && DECK_TYPES.includes(t)) {
      query = query.eq("type", t)
    }
  }

  const {data, error} = await query.order(
    'name', {ascending: true}
  ).range(
    page * DECK_FETCH_LIMIT, 
    (page * DECK_FETCH_LIMIT) + DECK_FETCH_LIMIT - 1
  ).overrideTypes<YuGiOhDeck[]>()

  return {data: data ? data : [], error: error}
  
}