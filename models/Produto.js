const mongoose = require('mongoose');

const ProdutoSchema = new mongoose.Schema({
    nome: {type: String, require: true, minlenght: 3},
    preco: {type: Number, require: true, minlenght: 0},
    estoque: {type: Number, require: true, minlenght: 0}
});

module.exports = mongoose.model('Produto', ProdutoSchema);