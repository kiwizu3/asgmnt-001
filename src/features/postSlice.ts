import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { Post, Comment, User, PostState } from "../types";

import { fetchAllPosts, fetchSinglePost, fetchPostComments, fetchUsersAPI } from "../services/api";


const initialState: PostState = {
    posts: [],
    post: null,
    comments: [],
    users: [],
    loggedInUser: null,
    loading: false,
    error: null,
}

// Fetch users from RandomUser API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    console.log("fetchUsers action dispatched");
    return await fetchUsersAPI();
});

// Fetch all posts and assign users to them
export const fetchPosts = createAsyncThunk('post/fetchPosts', async (_, { getState }) => {
    const posts = await fetchAllPosts();  // Fetch posts
    const state = getState() as { post: PostState }; // Get state to access users
    const users = state.post.users; // Get users from state
    console.log("Users in state:", users);
    // Assign a random user to each post
    return posts.map((post: Post) => ({
        ...post,
        user: users[Math.floor(Math.random() * users.length)], // Randomly assign a user to the post
    }));
});

// Fetch a single post and assign user to it
export const fetchPost = createAsyncThunk('post/fetchPost', async (postId: number, { getState }) => {
    const post = await fetchSinglePost(postId); // Fetch single post
    const state = getState() as { post: PostState }; // Get state to access users
    const users = state.post.users; // Get users from state

    // Assign a random user to the post
    return {
        ...post,
        user: users[Math.floor(Math.random() * users.length)], // Randomly assign a user to the post
    };
});

// Fetch comments for a specific post and assign users to them
export const fetchComments = createAsyncThunk('post/fetchComments', async (postId: number, { getState }) => {
    const comments = await fetchPostComments(postId); // Fetch comments for the post
    const state = getState() as { post: PostState }; // Get state to access users
    const users = state.post.users; // Get users from state

    // Assign a random user to each comment
    return comments.map((comment: Comment) => ({
        ...comment,
        user: users[Math.floor(Math.random() * users.length)], // Randomly assign a user to the comment
    }));
});


const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      // Handle fetching users
      builder
        .addCase(fetchUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = action.payload;
          state.loggedInUser = action.payload[0]; // Set first user as logged-in user
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to load users';
        });
  
      // Handle fetching posts and assigning users
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to load posts';
        });
  
      // Handle fetching single post and assigning user
      builder
        .addCase(fetchPost.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.post = null; // Reset post state when loading a new post
          state.comments = []; // Clear comments when a new post is being fetched
        })
        .addCase(fetchPost.fulfilled, (state, action: PayloadAction<Post>) => {
          state.loading = false;
          state.post = action.payload; // Set the fetched post with the assigned user
        })
        .addCase(fetchPost.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to load post';
        });
  
      // Handle fetching comments and assigning users
      builder
        .addCase(fetchComments.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchComments.fulfilled, (state, action: PayloadAction<Comment[]>) => {
          state.loading = false;
          state.comments = action.payload; // Set comments with assigned users
        })
        .addCase(fetchComments.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to load comments';
        });
    },
  });


export default postSlice.reducer;

