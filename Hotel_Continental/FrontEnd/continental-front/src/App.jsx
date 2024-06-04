import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Routes , Route, BrowserRouter } from 'react-router-dom'

import './App.css'
import { Home } from './pages/Home'
import { Regiones } from './pages/Regiones'
import { America } from './pages/America'
import { Europa } from './pages/Europa'
import { Conflictos } from './pages/Conflictos'
import { Castigos } from './pages/Castigos'
import { Reglamento } from './pages/Reglamento'
function App() {
  

  return (
    
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path= '/reglamento' element={<Reglamento></Reglamento>}></Route>
        <Route path= '/castigos' element={<Castigos></Castigos>}></Route>
        <Route path= '/home' element={<Home></Home>}></Route>
        <Route path= '/registro' element={<Regiones></Regiones>}></Route>
        <Route path= '/america' element={<America></America>}></Route>
        <Route path= '/europa' element={<Europa></Europa>}></Route>
        <Route path= '/conflictos' element={<Conflictos></Conflictos>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
      
    
  )
}

export default App
