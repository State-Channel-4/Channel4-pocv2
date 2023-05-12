export interface Tag {
  _id: string
  name: string
}

export interface TagMap extends Map<string, Tag> {}

export interface Channel4Link {
  _id: number
  title: string
  url: string
  submittedBy: string
  upvotes: number
  downvotes: number
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
