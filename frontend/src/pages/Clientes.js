import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Table, Button, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [editando, setEditando] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    useEffect(() => {
        carregarClientes();
    }, []);

    const carregarClientes = async () => {
        try {
            const response = await api.get('/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    const cadastrarCliente = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                // Se estiver editando, atualiza o cliente
                await api.put(`/clientes/${editando}`, { nome, email, telefone });
            } else {
                // Se não estiver editando, cadastra um novo cliente
                const response = await api.post('/clientes', { nome, email, telefone });
                setClientes([...clientes, response.data]); 
            }

            setEditando(null); 
            setNome('');
            setEmail('');
            setTelefone('');
            carregarClientes(); 

        } catch (error) {
            console.error("Erro ao cadastrar/editar cliente:", error);
        }
    };

    const iniciarEdicao = (cliente) => {
        setEditando(cliente._id);
        setNome(cliente.nome);
        setEmail(cliente.email);
        setTelefone(cliente.telefone);
    };

    const excluirCliente = async (id) => {
        try {
            await api.delete(`/clientes/${id}`);
            setClientes(clientes.filter(cliente => cliente._id !== id));
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-4 text-center">Gerenciar Clientes</h1>

            {/* Formulário de Cadastro/Edição */}
            <Form onSubmit={cadastrarCliente} className="mb-4 p-4 border rounded bg-light">
                <h4>{editando ? "Editar Cliente" : "Adicionar Cliente"}</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Telefone</Form.Label>
                    <Form.Control type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                </Form.Group>
                <Button variant={editando ? "success" : "primary"} type="submit">
                    {editando ? "Salvar Edição" : "Cadastrar"}
                </Button>{' '}
                {editando && <Button variant="secondary" onClick={() => setEditando(null)}>Cancelar</Button>}
            </Form>

            {/* Tabela de Clientes */}
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente._id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.telefone}</td>
                            <td>
                                <Button onClick={() => iniciarEdicao(cliente)}>Editar</Button>{' '}
                                <Button variant="danger" onClick={() => excluirCliente(cliente._id)}>Excluir</Button>
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

export default Clientes;
