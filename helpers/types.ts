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
    cropped_image_url: string
}

export type YuGiOhDeck = {
    name: string
    deck_id: number
    type: string
    image_url: string
    cropped_image_url: string
    num_cards: number
    avg_attack: number
    avg_defence: number
    avg_level: number
    archetypes: string[] | {
        [x: string]: any;
        [x: number]: string;
    }[]
    attributes: string[] | {
        [x: string]: any;
        [x: number]: string;
    }[]
    frametypes: string[] | {
        [x: string]: any;
        [x: number]: string;
    }[]
    races: string[] | {
        [x: string]: any;
        [x: number]: string;
    }[]
    types: string[] | {
        [x: string]: any;
        [x: number]: string;
    }[]
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


export type Filter = Map<string, string | null | string[]>

export type NumberComp = "Greater" | "Greater or equal" | "Equal"

export type NumberFilterType = {
    number: string
    comp: NumberComp | null
}

export type CardOrderBy = "name" | "attack" | "defence" | "level"


export type Order = "ASC" | "DESC"