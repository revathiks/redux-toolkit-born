import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './app/feature/counter/counter';
import {Routes,Route} from 'react-router-dom';
import Posts from './app/feature/posts';
import Layout from './components/Layout';
import PostLists from './app/feature/posts/PostLists';
import PostForm from './app/feature/posts/PostForm';
import SinglePost from './app/feature/posts/SinglePost';
import PostEditForm from './app/feature/posts/PostEditForm';
function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostLists />} />
        <Route path='post'>
          <Route index element={<PostForm/>} />
          <Route path=':postId' element ={<SinglePost/>} />
          <Route path='edit/:postId' element={<PostEditForm/>} />
        </Route>
        
      </Route>
      

     </Routes>
    </div>
  );
}

export default App;
