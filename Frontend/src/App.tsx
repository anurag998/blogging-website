import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = '/signin' element={<SignIn />} ></Route>
          <Route path = '/signup' element={<SignUp />}></Route>
          <Route path = '/blog/:id' element={<Blog />}></Route>
          <Route path = '/blogs' element={<Blogs />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
