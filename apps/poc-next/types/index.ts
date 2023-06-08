export interface Tag {
  _id: string
  name: string
}

export interface TagMap extends Map<string, Tag> {}

<<<<<<< HEAD
export interface Channel4Link {
  _id: number
  title: string
  url: string
  submittedBy: string
  upvotes: number
  downvotes: number
=======
export interface C4Content {
  _id: string
  title: string
  url: string
  submittedBy: string
  likes: number
>>>>>>> origin/main
  tags: Tag[]
  createdAt: Date
  updatedAt: Date
  syncedToBlockchain: boolean
}

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}
