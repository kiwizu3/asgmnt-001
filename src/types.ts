export interface User {
    id: number;
    name: string;
    avatar: string;
    img: string;
    email: string;
    phone: string;
    registered: string;
    birthday: string;
    city: string;
  }
  
  export interface Post {
    id: number;
    title: string;
    body: string;
    user: User; // Each post has a user (author)
  }
  
  export interface Comment {
    id: number;
    postId: number;
    name: string;
    body: string;
    user: User; // Each comment has a user (author)
  }
  
  export interface PostState {
    posts: Post[];
    post: Post | null;
    comments: Comment[];
    users: User[];
    loggedInUser: User | null;
    loading: boolean;
    error: string | null;
  }
  