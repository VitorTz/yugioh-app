import { Session, User } from "@supabase/supabase-js"

export type OrderBy = "name" | "attack" | "defence" | "level"

export type ImageDB = {
    image_id: number
    image_url: string
}

export type YuGiOhCard = {
    name: string
    card_id: number
    descr: string
    attack: number | null | undefined
    defence: number | null | undefined
    level: number | null | undefined
    attribute: string | null | undefined
    archetype: string | null | undefined
    frametype: string
    race: string | null | undefined
    type: string 
    image_url: string
}

export interface UserDB {    
    user_id: string
    name: string
    image: ImageDB    
}

export interface ColorDB {
    name: string
    hex: string
}

export interface GlobalContext {
    session: Session
    user: UserDB
    profileIcons: ImageDB[]    
}

export interface GlobalState {
    context: GlobalContext | null | undefined;
    setContext: (newContext: GlobalContext | null | undefined) => void;
};

export type CARD_STRING_COLUMN = "name" | "attribute" | "archetype" | "frametype" | "type" | "race" | string

export interface FetchCardOptions {
  name: CARD_STRING_COLUMN | null  
  page: number 
  attack: number | null
  attackEQ: boolean | null
  attackGE: boolean | null  

  defence: number | null
  defenceEQ: boolean | null
  defenceGE: boolean | null  

  level: number | null
  levelEQ: boolean | null
  levelGE: boolean | null  

  attribute: CARD_STRING_COLUMN | null
  archetype: CARD_STRING_COLUMN | null
  frametype: CARD_STRING_COLUMN | null
  type: CARD_STRING_COLUMN | null
  race: CARD_STRING_COLUMN | null 
}


export interface FetchCardParams {
    options: FetchCardOptions
    page: number
}


export type Filter = Map<string, string | null>

export type NumberComp = "Greater" | "Greater or equal" | "Equal"

export type NumberFilterType = {
    number: string
    comp: NumberComp | null
}

export type CardOrderBy = "name" | "attack" | "defence" | "level"


export type Order = "ASC" | "DESC"