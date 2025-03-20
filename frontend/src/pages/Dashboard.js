import React, {useEffect, useState} from 'react';
import api from '../services/api';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Dashboard() {
    const { usuario, logout } = useContext(AuthContext)
    const [stats, setStats] = useState({totalClientes: 0, totalProdutos: 0, totalVendas: 0})

    useEffect(() => {
        api.get('/stats')
            .then(response => setStats(response.data))
            .catch(error => console.error("Erro ao buscar por estatísticas", error))
    }, [])

    return (
        <Container className="mt-5">
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center">Bem-vindo, {usuario?.nome}!</h1>
                </Col>
            </Row>
            <Row>
                <Col md={4}>
                    <Card className="text-center shadow">
                        <Card.Body>
                            <Card.Title>Clientes</Card.Title>
                            <Card.Text>Gerencie seus clientes de forma fácil.</Card.Text>
                            <Button variant="primary" href="/clientes">Acessar</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center shadow">
                        <Card.Body>
                            <Card.Title>Produtos</Card.Title>
                            <Card.Text>Controle seu estoque e preços.</Card.Text>
                            <Button variant="success" href="/produtos">Acessar</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center shadow">
                        <Card.Body>
                            <Card.Title>Vendas</Card.Title>
                            <Card.Text>Veja suas vendas e transações.</Card.Text>
                            <Button variant="warning" href="/vendas">Acessar</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col className="text-center">
                    <Button variant="danger" onClick={logout}>Sair</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
