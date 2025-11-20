import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Demo from './pages/Demo'
import Contact from './pages/Contact'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/demo" element={<Demo/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </HashRouter>
  )
}

export default App
