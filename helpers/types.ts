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
    color: string
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

export type YuGiOhUserCard = {
    total: number;
    cards: {
        card_id: number;
        name: string;
        descr: string;
        color: string;
        attack: string | null;
        defence: string | null;
        level: number | null;
        attribute: string | null;
        archetype: string | null;
        frametype: string | null;
        race: string | null;
        type: string | null;
        image_url: string;
        cropped_image_url: string;
    }[]
}

export type YuGiOhUserDeck = {
    deck_id: number;
    name: string
    image_url: string
    num_cards: number
    type: string
    archetypes: string[]
    attributes: string[]
    frametypes: string[]
    races: string[]
    types: string[]
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
