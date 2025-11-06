import { HashRouter, Route, Routes } from 'react-router'
import './App.css'
import Home from './components/Home'

function App() {
  return <HashRouter>
    <Routes>
      <Route path="/" element={<Home/>}>

      </Route>
    </Routes>
  </HashRouter>
}

export default App
