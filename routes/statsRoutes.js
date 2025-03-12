const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Produto = require('../models/Produto');
const Venda = require('../models/Venda');

// Rota para obter estatísticas
router.get('/', async (req, res) => {
    try {
        const totalClientes = await Cliente.countDocuments();
        const totalProdutos = await Produto.countDocuments();
        const totalVendas = await Venda.countDocuments();

        res.json({
            totalClientes,
            totalProdutos,
            totalVendas
        });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar estatísticas" });
    }
});

module.exports = router;
