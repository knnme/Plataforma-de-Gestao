const express = require('express');
const router = express.Router();
const Venda = require('../models/Venda');

// Criar Venda
router.post('/', async (req, res) => {
    try {
        const venda = new Venda(req.body);
        await venda.save();
        res.status(201).json(venda);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deltar vendas
router.delete('/:id', async (req, res) => {
    try {
        await Venda.findByIdAndDelete(req.params.id)
        res.json({ message: "Venda removida com sucesso"})
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir venda"})
    }
})

// Listar Vendas
router.get('/', async (req, res) => {
    try {
        const vendas = await Venda.find()
            .populate({ path: 'cliente', select: 'nome' })
            .populate({ path: 'produtos', select: 'nome preco', strictPopulate: false }); // 🚀 Ajuste aqui

        res.json(vendas);
    } catch (error) {
        console.error("Erro ao buscar vendas:", error);
        res.status(500).json({ error: "Erro ao buscar vendas" });
    }
});


module.exports = router;
