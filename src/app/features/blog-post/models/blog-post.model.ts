import { Category } from "../../category/models/category.model";

export interface BlogPost {
    id: string,
    title: string, 
    shortDescription: string,
    content: string,
    blogImageUrl: string,
    urlHandle: string,
    author: string,
    publishedDate: Date,
    isVisible: boolean,
    categories: Category[],
}