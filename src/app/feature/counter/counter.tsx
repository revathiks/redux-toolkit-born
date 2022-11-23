import React, { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import { AppDispatch, RootState } from '../../../storeConfig';
import { decrement, increment, incrementAysnc } from './counterSlice';

export const Counter = () => {
    const dispatch =useDispatch<AppDispatch>();
    const counter= useSelector<RootState>(state=>state.counter.count);
    const [incrementAmount,setincrementAmount]=useState('2')
    const incrementValue = Number(incrementAmount) || 0;
  return (
    <>
        <div>counter is  <>{counter}</></div>        
        <button onClick={()=>dispatch(increment())}>Increment</button>
        <button onClick={()=>dispatch(decrement())}>deccrement</button>
        <input
         
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setincrementAmount(e.target.value)}
        />
        <button onClick={()=>dispatch(incrementAysnc(incrementValue))}>Increment by async</button>
    </>
  )
}
export default Counter;
