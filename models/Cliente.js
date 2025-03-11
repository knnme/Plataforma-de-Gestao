const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    nome: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    telefone: {type: String},
    historicoCompras: [{ type: mongoose.Schema.Types.ObjectId, ref : 'Venda' }]
});

module.exports = mongoose.model('Cliente', ClientSchema);