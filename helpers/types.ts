import { Session, User } from "@supabase/supabase-js"

export interface ImageDB {
    imageId: number
    imageUrl: string
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
