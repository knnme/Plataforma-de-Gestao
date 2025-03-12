import React, {useEffect, useState} from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

function Home() {
    const [stats, setStats] = useState({totalClientes: 0, totalProdutos: 0, totalVendas: 0})

    useEffect(() => {
        api.get('/stats')
            .then(response => setStats(response.data))
            .catch(error => console.error("Erro ao buscar por estatísticas", error))
    }, [])

    return (
        <div>
            <h1>Plataforma de Gestão</h1>
            <p>Bem-vindo! Escolha uma opção:</p>
            <ul>
                <li><Link to="/clientes">Gerenciar Clientes</Link></li>
                <li><Link to="/produtos">Gerenciar Produtos</Link></li>
                <li><Link to="/vendas">Gerenciar Vendas</Link></li>
            </ul>

            <div>
                <h1>Dashboard</h1>
                <div>
                    <p><strong>Total de Clientes</strong>{stats.totalClientes}</p>
                    <p><strong>Total de Produtos</strong>{stats.totalProdutos}</p>
                    <p><strong>Total de Vendas</strong>{stats.totalVendas}</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
