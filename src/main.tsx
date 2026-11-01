import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Projects from './pages/Projects'
import Post from './pages/Post'
import NotFound from './pages/NotFound'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
