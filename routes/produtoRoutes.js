const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// Criar Produto
router.post('/', async (req, res) => {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).json(produto);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Deletar Produto
router.delete('/:id', async (req, res) => {
    try {
        await Produto.findByIdAndDelete(req.params.id)
        res.json({ message: "Produto removido com sucesso" })
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir produto"})
    }
})

// Listar Produtos
router.get('/', async (req, res) => {
    const produtos = await Produto.find();
    res.json(produtos);
});

module.exports = router;
