const mongoose = require('mongoose');

const VendaSchema = new mongoose.Schema({
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    produtos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Produto', required: true }],
    total: { type: Number, required: true },
    data: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Venda', VendaSchema);