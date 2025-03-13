import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [editando, setEditando] = useState(null);
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [estoque, setEstoque] = useState('');

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

    const cadastrarOuEditarProduto = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await api.put(`/produtos/${editando}`, { nome, preco, estoque });
            } else {
                const response = await api.post('/produtos', { nome, preco, estoque });
                setProdutos([...produtos, response.data]);
            }
            limparFormulario();
            carregarProdutos();
        } catch (error) {
            console.error("Erro ao salvar produto:", error);
        }
    };

    const iniciarEdicao = (produto) => {
        setEditando(produto._id);
        setNome(produto.nome);
        setPreco(produto.preco);
        setEstoque(produto.estoque);
    };

    const excluirProduto = async (id) => {
        try {
            await api.delete(`/produtos/${id}`);
            setProdutos(produtos.filter(produto => produto._id !== id));
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
        }
    };

    const limparFormulario = () => {
        setEditando(null);
        setNome('');
        setPreco('');
        setEstoque('');
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-4 text-center">Gerenciar Produtos</h1>

            {/* Formulário de Cadastro/Edição */}
            <Form onSubmit={cadastrarOuEditarProduto} className="mb-4 p-4 border rounded bg-light">
                <h4>{editando ? "Editar Produto" : "Adicionar Produto"}</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="number" value={preco} onChange={(e) => setPreco(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Estoque</Form.Label>
                    <Form.Control type="number" value={estoque} onChange={(e) => setEstoque(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">{editando ? "Salvar Alterações" : "Cadastrar"}</Button>{' '}
                {editando && <Button variant="secondary" onClick={limparFormulario}>Cancelar</Button>}
            </Form>

            {/* Tabela de Produtos */}
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Estoque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                        <tr key={produto._id}>
                            <td>{produto.nome}</td>
                            <td>R$ {produto.preco}</td>
                            <td>{produto.estoque}</td>
                            <td>
                                <Button variant="warning" onClick={() => iniciarEdicao(produto)}>Editar</Button>{' '}
                                <Button variant="danger" onClick={() => excluirProduto(produto._id)}>Excluir</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div className='text-center mt-4'>
                <Link to='/' className='btn btn-secondary'>Voltar</Link>
            </div>
        </Container>
    );
}

export default Produtos;
