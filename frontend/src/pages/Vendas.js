import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Table, Button, Container, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Vendas() {
    const [vendas, setVendas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [cliente, setCliente] = useState("");
    const [produto, setProduto] = useState("");
    const [quantidade, setQuantidade] = useState("");

    useEffect(() => {
        carregarVendas();
        carregarClientes();
        carregarProdutos();
    }, []);

    const carregarVendas = async () => {
        try {
            const response = await api.get("/vendas");
            setVendas(response.data);
        } catch (error) {
            console.error("Erro ao buscar vendas:", error);
        }
    };

    const carregarClientes = async () => {
        try {
            const response = await api.get("/clientes");
            setClientes(response.data);
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        }
    };

    const carregarProdutos = async () => {
        try {
            const response = await api.get("/produtos");
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    const cadastrarVenda = async (e) => {
        e.preventDefault()

        if (!cliente || !produto || !quantidade) {
            alert("Por favor, preencha todos os campos.")
            return
        }

        try {
            await api.post("/vendas", {
                cliente,
                produto,
                quantidade: parseInt(quantidade, 10)
            })

            setCliente("")
            setProduto("")
            setQuantidade("")
            carregarVendas() //Atualiza a lista após o cadastro

            alert("Venda registrada com sucesso!")
        } catch (error) {
            console.error("Erro ao registrar venda:", error)
            alert("Erro ao registrar venda. Tente novamente.")
        }
    }

    return (
        <Container className="mt-5">
            <Card className="p-4 shadow">
                <h2 className="text-center mb-4">Gerenciar Vendas</h2>
                <Form className="mb-4">
                    <Form.Group>
                        <Form.Label>Cliente</Form.Label>
                        <Form.Select value={cliente} onChange={(e) => setCliente(e.target.value)}>
                            <option value="">Selecione um cliente</option>
                            {clientes.map(c => <option key={c._id} value={c._id}>{c.nome}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Produto</Form.Label>
                        <Form.Select value={produto} onChange={(e) => setProduto(e.target.value)}>
                            <option value="">Selecione um produto</option>
                            {produtos.map(p => <option key={p._id} value={p._id}>{p.nome}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
                    </Form.Group>
                    <Button onClick={cadastrarVenda} variant="primary" className="mt-3">Registrar Venda</Button>
                </Form>

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
                                <td>
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

export default Vendas;
