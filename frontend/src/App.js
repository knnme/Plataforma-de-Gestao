import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Clientes from './pages/Clientes'
import Produtos from './pages/Produtos'
import Vendas from './pages/Vendas'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
    </Router>
  )
}

export default App