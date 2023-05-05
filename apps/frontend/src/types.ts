export type TagType = {
    _id: number
    name: string
}

export type UrlType = {
    _id: number
    title: string
    url: string
    submittedBy: string
    upvotes: number
    downvotes: number
    tags: TagType[]
    createdAt: Date
    updatedAt: Date
    syncedToBlockchain: boolean
}