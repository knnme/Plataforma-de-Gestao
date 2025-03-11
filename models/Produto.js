const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: {type: String, require: true},
    preco: {type: Number, require: true},
    estoque: {type: Number, require: true}
});

module.exports = mongoose.model('Produto', ProdutoSchema);