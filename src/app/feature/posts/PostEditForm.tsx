import React ,{useEffect}from 'react'
import {Formik,Form,Field} from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../storeConfig';
import { fetchUsers } from '../users/usersSlice';
import { addPost, editPost } from './postSlice';
import {useNavigate,useParams} from 'react-router-dom'

const PostEditForm = () => {
const navigate=useNavigate();
const {postId} =useParams();
const posts=useSelector(((state:RootState)=>state.posts.posts))
const currentpost= posts.find(post=>post.id===Number(postId ))
const initialValues={
    userId:currentpost?.userId,
    id:currentpost?.id,
    title:currentpost?.title,
    body:currentpost?.body,
}

const postsSchema =yup.object().shape({
    title:yup.string().required('Title is required'),
    body:yup.string().required('Content is required')
})
const dispatch =useDispatch<AppDispatch>()
const users =useSelector((state:RootState)=>state.users.users)
useEffect(()=>{
       dispatch(fetchUsers())
},[dispatch])
console.log(users)


  return (
    <>
    <div>Edit Post</div>
    <Formik
    initialValues={initialValues}
    onSubmit={(values,action)=>{
        console.log(values)
        dispatch(editPost(values))
        navigate('/')

    }}
    validationSchema={postsSchema}
    >
    {
        ({touched,values,errors,setFieldValue }:any) =>(
        <Form>
            <Field name="title" placeholder= "Title"/>
            <div>{touched.title && errors.title ? errors.title :''} </div>

            <Field name="body" placeholder= "Content"/>
            <div>{touched.body && errors.body ? errors.body :''} </div>

            <Field as="select" name="userId"  value={currentpost?.userId}>
             {
                users.map(user=>(<option key={user.id} value={user.id}>{user.name}</option>))
             }
           </Field>
          

            <button type="submit">Update</button>

        </Form>

        )
            
    }
    </Formik>
    </>

  )
}

export default PostEditForm