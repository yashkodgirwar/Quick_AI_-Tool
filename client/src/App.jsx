import Home from './pages/Home'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import WriteArticle from './pages/WriteArticle'
import Dashboard from './pages/Dashboard'
import Layout from './pages/Layout'
import BlogTitles from './pages/BlogTitles'
import GenerateImages from './pages/GenerateImages'
import RemoveBackground from './pages/RemoveBackground'
import RemoveObject from './pages/RemoveObject'
import Community from './pages/Community'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ai' element={<Layout />} >
          <Route index element={<Dashboard />}/>
          <Route path='write-article' element={<WriteArticle />} />
          <Route path='blog-titles' element={<BlogTitles />} />
          <Route path='generate-images' element={<GenerateImages />} />
          <Route path='remove-background' element={<RemoveBackground />} />
          <Route path='remove-object' element={<RemoveObject />} />
          <Route path='community' element={<Community />} />


        </Route>

      </Routes>


    </div>
  )
}

export default App
