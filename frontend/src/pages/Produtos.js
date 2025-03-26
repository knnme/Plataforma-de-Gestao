import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Table, Button, Container, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [estoque, setEstoque] = useState("");
    const [editando, setEditando] = useState(null);

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

    const excluirProduto = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;

        try {
            await api.delete(`/produtos/${id}`);
            setProdutos(prevProdutos => prevProdutos.filter(produto => produto._id !== id));
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
        }
    }

    const editarProduto = (produto) => {
        setEditando(produto._id)
        setNome(produto.nome)
        setPreco(produto.email)
        setEstoque(produto.telefone)
    }

    const cadastrarOuEditarProduto = async (e) => {
        e.preventDefault()

        if (editando) {
            await api.put(`/produtos/${editando}`, {nome, preco, estoque})
        } else {
            await api.post(`produtos`, {nome, preco, estoque})
        }

        setNome("")
        setPreco("")
        setEstoque("")
        setEditando(null)
        carregarProdutos()
    }

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
                    <Button onClick={cadastrarOuEditarProduto} variant="primary" className="mt-3">{editando ? "Salvar" : "Cadastrar"}</Button>
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
                                    <Button onClick={() => editarProduto(produto)} variant="warning" size="sm" className="me-2">Editar</Button>
                                    <Button onClick={() => excluirProduto(produto._id)} variant="danger" size="sm">Excluir</Button>
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
