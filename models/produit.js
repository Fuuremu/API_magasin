const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const produitSchema = mongoose.Schema({
    name: {type: String, required: true},
    categorieId: {type: Schema.Types.ObjectId, required: true}, 
    categorieName: {type: String, required: true}, 
    price: {type: Number, required: true},
    photo: {type: String, required: true}
})
module.exports = mongoose.model('Produit', produitSchema)