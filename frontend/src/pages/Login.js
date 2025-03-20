import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, senha);
        navigate("/dashboard");
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg" style={{ width: "400px" }}>
                <h2 className="text-center mb-4">🔐 Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Entrar
                    </Button>
                </Form>

                <Row className="mt-3">
                    <Col className="text-center">
                        <a className="text-decoration-none">Esqueceu a senha?</a>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
}

export default Login;
