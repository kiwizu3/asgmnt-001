import {configureStore} from '@reduxjs/toolkit';
import postReducer from './features/postSlice';

export const store = configureStore({
  reducer: {
    post: postReducer,
  },
})

//Creating typescript type for the Root State and App Dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;