const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    nome: {type: String, require: true, minlenght: 3},
    email: {type: String, unique: true, require: true, match: /.+\@.+\..+/},
    telefone: {type: String, minlenght: 8},
    historicoCompras: [{ type: mongoose.Schema.Types.ObjectId, ref : 'Venda' }]
});

module.exports = mongoose.model('Cliente', ClientSchema);