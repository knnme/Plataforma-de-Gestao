import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Vendas() {
    const [vendas, setVendas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [cliente, setCliente] = useState('');
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');

    useEffect(() => {
        carregarVendas();
        carregarClientes();
        carregarProdutos();
    }, []);

    const carregarVendas = async () => {
        try {
            console.log("Chamando API: ", api.defaults.baseURL + "/vendas");
            const response = await api.get('/vendas');
            console.log("Dados recebidos:", response.data);
            setVendas(response.data);
        } catch (error) {
            console.error("Erro ao buscar vendas:", error.response ? error.response.data : error.message);
        }
    };

    const carregarClientes = async () => {
        try {
            const response = await api.get('/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    const carregarProdutos = async () => {
        try {
            const response = await api.get('/produtos');
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    const cadastrarVenda = async (e) => {
        e.preventDefault();
    
        if (!cliente || !produto || !quantidade) {
            console.error("Erro: Todos os campos são obrigatórios!");
            return;
        }
    
        try {
            console.log("Enviando venda:", { cliente, produto, quantidade: Number(quantidade) });
    
            const response = await api.post('/vendas', { 
                cliente, 
                produto, 
                quantidade: Number(quantidade) // Certifica que a quantidade é um número
            });
    
            setVendas([...vendas, response.data]);
            limparFormulario();
            carregarVendas();
        } catch (error) {
            console.error("Erro ao cadastrar venda:", error.response ? error.response.data : error.message);
        }
    };

    const excluirVenda = async (id) => {
        try {
            await api.delete(`/vendas/${id}`);
            setVendas(vendas.filter(venda => venda._id !== id));
        } catch (error) {
            console.error("Erro ao excluir venda:", error);
        }
    };

    const limparFormulario = () => {
        setCliente('');
        setProduto('');
        setQuantidade('');
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-4 text-center">Gerenciar Vendas</h1>

            {/* Formulário de Cadastro */}
            <Form onSubmit={cadastrarVenda} className="mb-4 p-4 border rounded bg-light">
                <h4>Adicionar Venda</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Select value={cliente} onChange={(e) => setCliente(e.target.value)} required>
                        <option value="">Selecione um cliente</option>
                        {clientes.map(c => <option key={c._id} value={c._id}>{c.nome}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Produto</Form.Label>
                    <Form.Select value={produto} onChange={(e) => setProduto(e.target.value)} required>
                        <option value="">Selecione um produto</option>
                        {produtos.map(p => <option key={p._id} value={p._id}>{p.nome}</option>)}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Quantidade</Form.Label>
                    <Form.Control type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">Cadastrar Venda</Button>
            </Form>

            {/* Tabela de Vendas */}
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Cliente</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {vendas.map(venda => (
                        <tr key={venda._id}>
                            <td>{venda.cliente?.nome}</td>
                            <td>{venda.produto?.nome}</td>
                            <td>{venda.quantidade}</td>
                            <td><Button variant="danger" onClick={() => excluirVenda(venda._id)}>Excluir</Button></td>
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

export default Vendas;
