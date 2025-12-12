
export interface UpdateBlogPost {
    title: string | null;
    shortDescription: string | null;
    content: string | null;
    featuredImageUrl: string | null;
    urlHandle: string | null;
    publishedDate: string;
    author: string | null;
    isVisible: boolean;
    categories: string[];
}
