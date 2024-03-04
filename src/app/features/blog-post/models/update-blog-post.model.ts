export interface UpdateBlogPost {
    title: string, 
    shortDescription: string,
    content: string,
    blogImageUrl: string,
    urlHandle: string,
    author: string,
    publishedDate: Date,
    isVisible: boolean,
    categories: string[],
}