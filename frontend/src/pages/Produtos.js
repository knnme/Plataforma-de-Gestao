import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Table, Button, Container, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [estoque, setEstoque] = useState("");

    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        try {
            const response = await api.get("/produtos");
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    return (
        <Container className="mt-5">
            <Card className="p-4 shadow">
                <h2 className="text-center mb-4">Gerenciar Produtos</h2>
                <Form className="mb-4">
                    <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Preço</Form.Label>
                        <Form.Control type="number" value={preco} onChange={(e) => setPreco(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Estoque</Form.Label>
                        <Form.Control type="number" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" className="mt-3">Salvar Produto</Button>
                </Form>

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
                                <td>R$ {produto.preco.toFixed(2)}</td>
                                <td>{produto.estoque}</td>
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

export default Produtos;
