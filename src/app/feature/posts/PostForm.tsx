import React ,{useEffect}from 'react'
import {Formik,Form,Field} from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../storeConfig';
import { fetchUsers } from '../users/usersSlice';
import { addPost } from './postSlice';
import {useNavigate} from 'react-router-dom'

const PostForm = () => {
const navigate=useNavigate()
const initialValues={
    userId:'',
    id:'',
    title:'',
    body:'',
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
    <div>Add Post</div>
    <Formik
    initialValues={initialValues}
    onSubmit={(values,action)=>{
        console.log(values)
        dispatch(addPost(values))
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

            <Field as="select" name="userId" >
             {
                users.map(user=>(<option key={user.id} value={user.id}>{user.name}</option>))
             }
           </Field>
          

            <button type="submit">Add</button>

        </Form>

        )
            
    }
    </Formik>
    </>

  )
}

export default PostForm