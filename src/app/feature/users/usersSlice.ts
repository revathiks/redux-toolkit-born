import { createSlice,createAsyncThunk,Action } from "@reduxjs/toolkit";
import axios from 'axios';

const USER_URL='https://jsonplaceholder.typicode.com/users';

export const fetchUsers =createAsyncThunk('users/fetchUsers',
async()=>{
    const result =await axios.get(USER_URL);
    return result.data;
}) 

export interface IUser {
    "id": number,
    "name": string,
    "username": string,
    "email": string,
    "address": {
      "street": string,
      "suite": string,
      "city": string,
      "zipcode": string,
      "geo": {
        "lat": string,
        "lng": string
      }
    },
    "phone": string,
    "website": string
    "company": {
      "name": string,
      "catchPhrase": string,
      "bs": string
    }
}

export interface UserTypes {
    users:IUser[]
}
const initialState:UserTypes= {
    users:[]
}

const  UserSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.users=action.payload
        })
    }
})

export default UserSlice.reducer;
