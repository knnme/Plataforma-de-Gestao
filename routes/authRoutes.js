const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

const router = express.Router();

// Registro de usuário
router.post('/register', [
    body('nome').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('E-mail inválido'),
    body('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ erros: erros.array() });
    }

    const { nome, email, senha } = req.body;

    try {
        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ error: "E-mail já cadastrado" });
        }

        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        const novoUsuario = new Usuario({ nome, email, senha: senhaHash });
        await novoUsuario.save();

        res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ error: "Usuário não encontrado" });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(400).json({ error: "Senha incorreta" });
        }

        const token = jwt.sign({ id: usuario._id }, "segredo", { expiresIn: "1h" });

        res.json({ token, usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email } });
    } catch (error) {
        res.status(500).json({ error: "Erro ao fazer login" });
    }
});

// Rota protegida de teste
router.get('/user', async (req, res) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ error: "Acesso negado" });
    }

    try {
        const decoded = jwt.verify(token, "segredo");
        const usuario = await Usuario.findById(decoded.id).select("-senha");
        res.json(usuario);
    } catch (error) {
        res.status(400).json({ error: "Token inválido" });
    }
});

module.exports = router;
