require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const Cliente = require('./models/Cliente');
const Produto = require('./models/Produto');
const Vendas = require('./models/Venda');

const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes =  require('./routes/produtoRoutes');
const vendaRoutes = require('./routes/vendaRoutes');

app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/vendas', vendaRoutes);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Banco de dados conectado ao MongoDB Atlas!"))
    .catch(err => console.error("Erro ao conectar ao MongoDB:", err)); 
    
app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});