import React from 'react';
import { useSelector } from 'react-redux';
import {useParams,Link,useNavigate} from 'react-router-dom'
import { AppDispatch, RootState } from '../../../storeConfig';
import TimeAgo from './TimeAgo';
import { useDispatch } from 'react-redux';
import { deletePost } from './postSlice';

const SinglePost = () => {
    const {postId } =useParams();
    const navigate=useNavigate()
    const dispatch =useDispatch<AppDispatch>()
    const posts=useSelector(((state:RootState)=>state.posts.posts))
    const singlePost= posts.find(post=>post.id===Number(postId ))
    if(!singlePost) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const handleDelete =(post:any) =>{
        dispatch(deletePost(post))
        navigate('/')

    }
  return (
    <div>
        {
             <div key={singlePost.id}>
             <h1>{singlePost.title}</h1>
             <div>{singlePost.body}</div>
             <div><TimeAgo time={singlePost.date} /></div>
            <Link to={`/post/edit/${singlePost.id}`}>Edit</Link>
            <button onClick={()=>handleDelete(singlePost)}>Delete</button>
             
           </div>
        }
    </div>
  )
}

export default SinglePost