import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom'

function Vendas() {
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [clienteId, setClienteId] = useState('');
    const [produtoId, setProdutoId] = useState('');
    const [quantidade, setQuantidade] = useState(1);
    const [vendas, setVendas] = useState([]);

    // Buscar clientes e produtos ao carregar a página
    useEffect(() => {
        api.get('/clientes').then(response => setClientes(response.data));
        api.get('/produtos').then(response => setProdutos(response.data));
        api.get('/vendas').then(response => setVendas(response.data));
    }, []);

    // Função para registrar uma nova venda
    const registrarVenda = async (e) => {
        e.preventDefault();
        try {
            const produtoSelecionado = produtos.find(produto => produto._id === produtoId);
            const total = produtoSelecionado.preco * quantidade;

            const response = await api.post('/vendas', {
                cliente: clienteId,
                produtos: [produtoId],
                total
            });

            setVendas([...vendas, response.data]);
            setClienteId('');
            setProdutoId('');
            setQuantidade(1);
        } catch (error) {
            console.error("Erro ao registrar venda:", error);
        }
    };

    // Função para excluir vendas
    const excluirVenda = async (id) => {
        try {
            await api.delete(`/vendas/${id}`)
            setVendas(vendas.filter(venda => venda._id !== id))
        }   catch (error) {
        console.error("Erro ao excluir venda:", error)
        }
    }

    return (
        <div>
            <h1>Registro de Vendas</h1>

            {/* Formulário para cadastrar venda */}
            <form onSubmit={registrarVenda}>
                <select value={clienteId} onChange={(e) => setClienteId(e.target.value)} required>
                    <option value="">Selecione um Cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente._id} value={cliente._id}>{cliente.nome}</option>
                    ))}
                </select>

                <select value={produtoId} onChange={(e) => setProdutoId(e.target.value)} required>
                    <option value="">Selecione um Produto</option>
                    {produtos.map(produto => (
                        <option key={produto._id} value={produto._id}>{produto.nome} - R$ {produto.preco}</option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Quantidade"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    required
                    min="1"
                />
                <button type="submit">Registrar Venda</button>
            </form>

            {/* Lista de Vendas */}
            <h2>Histórico de Vendas</h2>
            <ul>
                {vendas.map(venda => (
                    <li key={venda._id}>
                        Cliente: {venda.cliente?.nome} - Total: R$ {venda.total}
                        <button onClick={() => excluirVenda(venda._id)}>Excluir</button>
                    </li>
                ))}
            </ul>
            <div>
                <h3><Link to='/'>Voltar</Link></h3>
            </div>
        </div>
    );
}

export default Vendas;
