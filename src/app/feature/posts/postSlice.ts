import {createSlice,createAsyncThunk,Action} from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../storeConfig';
import { format, formatDistance, formatRelative, subDays,sub  } from 'date-fns'
const POST_URL='https://jsonplaceholder.typicode.com/posts'
export interface IPost {
    userId:number| string,
    id:number,
    title:string,
    body:string,
    date:any
}
export interface PostTypes {
    posts:IPost[],
    status:'idle'| 'succeed' |'loading' | 'failed',
    error:null
}

const initialState:PostTypes={posts:[],status:'idle',error:null}

export const fetchPosts= createAsyncThunk ('posts/fetchPosts',
async()=>{
   const result= await axios.get(POST_URL)
   return result.data;
})

export const addPost =createAsyncThunk ('posts/addPost',
async(initialdata:any) =>{
    const result = await axios.post(POST_URL,initialdata)
    return result.data;
}
)

export const editPost =createAsyncThunk ('posts/editPost',
async(initialdata:any) =>{
    const {id} =initialdata;
    const result = await axios.put(`${POST_URL}/${id}`,initialdata)
    return result.data;
}
)

export const deletePost =createAsyncThunk ('posts/deletePost',
async(initialdata:any) =>{
    const {id} =initialdata;
    const result = await axios.delete(`${POST_URL}/${id}`)
    if (result?.status === 200) return initialdata;
    return `${result?.status}: ${result?.statusText}`;
}
)

const PostsSlice=createSlice({
    name:'posts',
    initialState,
    reducers:{       
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPosts.pending,(state,action)=>{
            state.status="loading"
        })
        
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status="succeed";
            
            //state.posts=action.payload
            let min=1;
            const loadedPosts = action.payload.map((post:any) => {
                post.date=sub(new Date(),{minutes:min++}).toISOString();
                return post;
            })
            state.posts=loadedPosts
        })
        
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status="failed"
        })
        .addCase(addPost.fulfilled,(state,action)=>{
            action.payload.id=state.posts.length+1
            action.payload.date= new Date().toISOString()
            state.posts.push(action.payload)
        })
        .addCase(editPost.fulfilled,(state,action)=>{
            const {id} =action.payload;
            action.payload.date = new Date().toISOString();
            const posts=state.posts.filter(post=>post.id!==id)
            state.posts=[...posts,action.payload]
        })
        .addCase(deletePost.fulfilled,(state,action)=>{
            const {id} =action.payload;
            const posts=state.posts.filter(post=>post.id!==id)
            state.posts=posts
        })
        
    }
})
// export const allposts: =(state)=>state.posts.posts;
// export const postsStatus =(state)=>state.posts.status;
// export const postserror =(state)=>state.posts.error;

export default PostsSlice.reducer;