interface Tag {
    name: string
    normalizedName: string
}
interface Category {
    name: string,
    normalizedName: string
}
interface Area {
    name: string
    normalizedName: string
}

interface MetaData {
    created: Date
    visible: boolean
    postId: string
    description: string
    area: Area
    categories: Category[]
    tags: Tag[]
}

interface Post {
    metadata: MetaData,
    authorId: string
    uri: string,
    content: string,
    title: string,
    featuredImg: string
}

export {Post, MetaData, Category, Tag, Area}