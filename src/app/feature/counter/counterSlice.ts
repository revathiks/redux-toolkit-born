import {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit';
import { fetchCount } from './counterApi';

export interface CounterType {
    count:number,
    status: 'idle' | 'loading' | 'failed';
}

const initialState:CounterType = {
    count:0,
    status:'idle'
    
} 
export const incrementAysnc=createAsyncThunk(
    'counter/fetchCount',
    async(count:number) =>  {
        const result =await fetchCount(count);
        return result.data;
    }
)
const CounterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increment: (state) => {
            state.count =state.count+1
        },
        decrement: (state) => {
            state.count =state.count-1
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(incrementAysnc.pending,(state)=>{
            state.status='loading'
        })
        .addCase(incrementAysnc.fulfilled,(state,action)=> {
            state.status="idle";
            state.count=state.count+action.payload
        })
        
        .addCase(incrementAysnc.rejected,(state)=>{
            state.status='failed';
        });
    },

})
export const {reducer,actions}=CounterSlice;
export const {increment,decrement}=CounterSlice.actions
export default reducer;