import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom'

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [editando, setEditando] = useState(null)
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [estoque, setEstoque] = useState('');

    // Buscar produtos da API
    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        try {
            const response = await api.get('/produtos');
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    // Função para cadastrar um novo produto
    const cadastrarProduto = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/produtos', { nome, preco, estoque });
            setProdutos([...produtos, response.data]); // Atualiza a lista
            setNome('');
            setPreco('');
            setEstoque('');
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
        }
    };

    // Função para excluir produtos
    const excluirProduto = async (id) => {
        try {
            await api.delete(`/produtos/${id}`)
            setProdutos(produtos.filter(produto => produto._id !==id))
        } catch (error) {
            console.error("Erro ao excluir produto", error)
        }
    }

    //Função para editar produtos
    const iniciarEdicao = (produto) => {
        setEditando(produto._id);
        setNome(produto.nome);
        setPreco(produto.preco);
        setEstoque(produto.estoque);
    };
    
    const salvarEdicao = async (id) => {
        try {
            await api.put(`/produtos/${id}`, { nome, preco, estoque });
            setEditando(null);
            carregarProdutos();
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
        }
    };

    return (
        <div>
            <h1>Lista de Produtos</h1>

            {/* Formulário de Cadastro */}
            <form onSubmit={cadastrarProduto}>
                <input
                    type="text"
                    placeholder="Nome do Produto"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Preço"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Estoque"
                    value={estoque}
                    onChange={(e) => setEstoque(e.target.value)}
                    required
                />
                <button type="submit">Cadastrar</button>
            </form>

            {/* Lista de Produtos */}
            <ul>
                {produtos.map(produto => (
                    <li key={produto._id}>
                    {editando === produto._id ? (
                        <>
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                            <input type="text" value={preco} onChange={(e) => setPreco(e.target.value)} />
                            <input type="text" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
                            <button onClick={() => salvarEdicao(produto._id)}>Salvar</button>
                            <button onClick={() => setEditando(null)}>Cancelar</button>
                        </>
                    ) : (
                        <>
                            {produto.nome} - R$ {produto.preco} - Estoque: {produto.estoque}
                            <button onClick={() => iniciarEdicao(produto)}>Editar</button>
                            <button onClick={() => excluirProduto(produto._id)}>Excluir</button>
                        </>
                    )}
                </li>
                    
                ))}
            </ul>
            <div>
                <h3><Link to='/'>Voltar</Link></h3>
            </div>
        </div>
    );
}

export default Produtos;
