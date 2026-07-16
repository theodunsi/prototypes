import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'
import Home from './pages/Home'
import ProjectDetail from './pages/ProjectDetail'
import ProjectsArchive from './pages/ProjectsArchive'
import SoundProvider from './components/SoundProvider'

export default function App() {
  return (
    <BrowserRouter>
      <SoundProvider>
        {/* Smooth (eased/inertia) scrolling across the whole site */}
        <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<ProjectsArchive />} />
            <Route path="/project/:slug" element={<ProjectDetail />} />
          </Routes>
        </ReactLenis>
      </SoundProvider>
    </BrowserRouter>
  )
}
