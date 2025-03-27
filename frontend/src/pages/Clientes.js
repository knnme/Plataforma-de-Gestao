import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Table, Button, Container, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [editando, setEditando] = useState(null);

    useEffect(() => {
        carregarClientes();
    }, []);

    const carregarClientes = async () => {
        try {
            const response = await api.get("/clientes");
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    const excluirCliente = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este cliente?")) return;

        try {
            await api.delete(`/clientes/${id}`);
            setClientes(prevClientes => prevClientes.filter(cliente => cliente._id !== id));
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    }

    const editarCliente = (cliente) => {
        setEditando(cliente._id)
        setNome(cliente.nome)
        setEmail(cliente.email)
        setTelefone(cliente.telefone)
    }

    const cadastrarOuEditarCliente = async (e) => {
        e.preventDefault()

        if (editando) {
            await api.put(`/clientes/${editando}`, {nome, email, telefone})
        } else {
            await api.post(`clientes`, {nome, email, telefone})
        }

        setNome("")
        setEmail("")
        setTelefone("")
        setEditando(null)
        carregarClientes()
    }

    return (
        <Container className="mt-5">
            <Card className="p-4 shadow">
                <h2 className="text-center mb-4">Gerenciar Clientes</h2>
                <Form className="mb-4">
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                    </Form.Group>
                    <Button onClick={cadastrarOuEditarCliente} variant="primary" className="mt-3"> {editando ? "Atualizar Cliente" : "Cadastrar Cliente"}</Button>
                </Form>

                <Table striped bordered hover responsive>
                    <thead className="table-dark">
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
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
                                    <Button onClick={() => editarCliente(cliente)} variant="warning" size="sm" className="me-2">Editar</Button>
                                    <Button onClick={() => excluirCliente(cliente._id)} variant="danger" size="sm">Excluir</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <tbody className='text-center mt-4'>
                    <Link to='/' className='btn btn-secondary'>Voltar</Link>
                </tbody>
            </Card>
        </Container>
    );
}

export default Clientes;
