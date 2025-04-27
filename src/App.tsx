import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import './App.scss'
import Home from './components/Home/Home'
import Tailwind from './components/tailwind/Tailwind'
import StyledComponents from './components/styled-component/StyledComponent'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/home' element={<Home />} />
        <Route path='/tailwind' element={<Tailwind />}/>
        <Route path='/styled-components' element={<StyledComponents />}/>
        <Route path='*' element={<Navigate to={"/home"} replace />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
