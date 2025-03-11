import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Plataforma de Gestão</h1>
            <p>Bem-vindo! Escolha uma opção:</p>
            <ul>
                <li><Link to="/clientes">Gerenciar Clientes</Link></li>
                <li><Link to="/produtos">Gerenciar Produtos</Link></li>
                <li><Link to="/vendas">Gerenciar Vendas</Link></li>
            </ul>
        </div>
    );
}

export default Home;
