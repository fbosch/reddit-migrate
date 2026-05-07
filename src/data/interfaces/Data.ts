type MultiRedditWeightingSchema = "classic" | "fresh"
type MultiRedditVisibility = "private" | "public" | "hidden"
type MultiRedditIcon =
    | "art and design"
    | "ask"
    | "books"
    | "business"
    | "cars"
    | "comics"
    | "cute animals"
    | "diy"
    | "entertainment"
    | "food and drink"
    | "funny"
    | "games"
    | "grooming"
    | "health"
    | "life advice"
    | "military"
    | "models pinup"
    | "music"
    | "news"
    | "philosophy"
    | "pictures and gifs"
    | "science"
    | "shopping"
    | "sports"
    | "style"
    | "tech"
    | "travel"
    | "unusual stories"
    | "video"

export interface Multireddit {
    name: string
    description: string
    visibility: MultiRedditVisibility
    icon_name: MultiRedditIcon
    key_color: string
    weighting_scheme: MultiRedditWeightingSchema
    copied_from: string | null
    subreddits: string[]
}

export default interface Data {
    exported_at?: string
    subscriptions: string[]
    follows: string[]
    friends: string[]
    blocked: string[]
    multireddits: Multireddit[]
    profile: Record<string, any>
    preferences: Record<string, any>
}
