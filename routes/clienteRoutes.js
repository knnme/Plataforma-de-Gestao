const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

//Criar Cliente
router.post('/', async (req, res) => {
    try {
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.status(201).json(cliente);
    } catch (err) {
        res.status(400).json({error: err.message });
    }
});

//Deletar Cliente
router.delete('/:id', async (req, res) => {
    try {
        await Cliente.findByIdAndDelete(req.params.id)
        res.json({ message: "Cliente removido com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: "Erro ao excluir cliente"})
    }
})

//Listar Cliente
router.get('/', async (req, res) => {
    const clientes = await Cliente.find();
    res.json(clientes);
});



module.exports = router;