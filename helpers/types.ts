import { Session, User } from "@supabase/supabase-js"


export interface ProfilePhoto {
    imageId: number
    imageUrl: string
}


export interface ProfileInfo {
    name: string
    profilePhoto: ProfilePhoto
}

export interface Context {
    session: Session
    user: User
    profileInfo: ProfileInfo
}

export interface GlobalState {
    context: Context | null;
    setContext: (newContext: Context | null) => void;
};
