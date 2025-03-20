import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Table, Button, Container, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");

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
                    <Button variant="primary" className="mt-3">Salvar</Button>
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
                                    <Button variant="warning" size="sm" className="me-2">Editar</Button>
                                    <Button variant="danger" size="sm">Excluir</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <tbody className='text-center mt-4'>
                    <Link to='/dashboard' className='btn btn-secondary'>Voltar</Link>
                </tbody>
            </Card>
        </Container>
    );
}

export default Clientes;
