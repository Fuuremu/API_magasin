const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProduitPanier = require(./produitPanier);

const produitPanierSchema = mongoose.Schema({
    name: { type: String, required: true }, 
    unit: {type: String, required: true }, 
    desc: { type: String, required: true }, 
    parentId: { type: Schema.Types.ObjectId, required: true }, 
    parentName: { type: String, required: true}, 
    price: { type: Number, required: true }, 
    photo: { type: String, required: true }, 
    quantity: { type: Number, required: true }, 
    totalProductPrice: {type: Number, required: true}
})

const commandeSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    CP: { type: String, required: true },
    city: { type: String, required: true },
    comments: { type: String, required: true },
    cart: [produitPanierSchema],
})

module.exports = mongoose.model()