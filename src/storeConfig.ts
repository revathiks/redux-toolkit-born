import { configureStore,Action,ThunkAction } from "@reduxjs/toolkit";
import counterReducer from './app/feature/counter/counterSlice';
import PostsReducer from './app/feature/posts/postSlice'
import UsersReducer from './app/feature/users/usersSlice'

const Store = configureStore({
    reducer:{
        counter:counterReducer,
        posts:PostsReducer,
        users:UsersReducer
    }
})

export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default Store;