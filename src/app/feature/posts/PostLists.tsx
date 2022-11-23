import React,{useEffect,memo} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../storeConfig'
import {   fetchPosts} from './postSlice';
import TimeAgo from './TimeAgo';
import {Link} from 'react-router-dom'


const PostLists = () => {
    const dispatch=useDispatch<AppDispatch>();
    const posts_Status=useSelector((state:RootState)=>state.posts.status)
    const error=useSelector((state:RootState)=>state.posts.error)
    const posts =useSelector((state:RootState)=>state.posts.posts)

    const orderedPost=posts.slice().sort((a,b)=>{
      if(a.date > b.date) return -1;
      else if(a.date <b.date) return 1;
      else return 0;
    })

    useEffect(()=>{
        if(posts_Status=='idle'){
           dispatch(fetchPosts())
        }

    },[posts_Status,dispatch])
   console.log("post",posts)
   console.log("post slice",posts.slice())

  return (
    <>    
   {posts_Status ==='succeed' && orderedPost.map(post=>(
    <div key={post.id}>
      <h1>{post.title}</h1>
      <div>{post.body}</div>
      <div><TimeAgo time={post.date} /></div>
      <div></div><Link to={`/post/${post.id}`}>View</Link>
    </div>
   ))}
    </>
    
  )
}

export default memo(PostLists)