import { Session, User } from "@supabase/supabase-js"

export interface ImageDB {
    imageId: number
    imageUrl: string
}

export interface YuGiOhCard {
    name: string
    card_id: number
    descr: string
    attack: number | null
    defence: number | null
    level: number | null
    attribute: string | null
    archetype: string | null
    frametype: string
    race: string | null
    type: string 
    image_url: string
}


export interface ProfileInfo {
    name: string    
    profilePhoto: ImageDB
}

export interface Context {
    session: Session
    user: User
    profileInfo: ProfileInfo
    allProfileIcons: ImageDB[]
}

export interface GlobalState {
    context: Context | null;
    setContext: (newContext: Context | null) => void;
};
