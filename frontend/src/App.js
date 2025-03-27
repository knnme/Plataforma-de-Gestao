import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from "react"
import Clientes from './pages/Clientes'
import Produtos from './pages/Produtos'
import Vendas from './pages/Vendas'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ProtectedRoute from './routes/ProtectedRoute'
import { Button, Container, Navbar } from 'react-bootstrap'

function App() {
  const [temaEscuro, setTemaEscuro] = useState(() => {
      return localStorage.getItem("tema") === "escuro";
  });

  useEffect(() => {
      document.body.setAttribute("data-bs-theme", temaEscuro ? "dark" : "light");
      localStorage.setItem("tema", temaEscuro ? "escuro" : "claro");
  }, [temaEscuro]);

  return (
    <Router>
      <>
          <Navbar bg={temaEscuro ? "dark" : "light"} variant={temaEscuro ? "dark" : "light"} >
            <Container>
              <Navbar.Brand>Gestão de Negocios</Navbar.Brand>
              <Button variant='dark' onClick={() => setTemaEscuro(!temaEscuro)}>
                {temaEscuro ? "🌞 Claro" : "🌙 Escuro"}
              </Button>
            </Container>
          </Navbar>
        </>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
    </Router>
  )
}

export default App