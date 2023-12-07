import {Post} from "@/types/blogTypes";

interface Author {
    id: string
    teamId: string
    name: string
    scope: "SELF" | "GENERAL"
    surname: string
    email: string
    posts: Post[]
}

export {Author}