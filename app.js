const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Categorie = require('./models/categorie');
const Produit = require('./models/produit');

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

mongoose.connect('mongodb+srv://esn:castres81@cluster0.7vtsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie!'))
    .catch(() => console.log('Connexion à MongoDB échouée!'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-RequestedWith, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-AllowMethods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// GET
app.get('/articles', (req, res, next) => {
    const articles = ['toto', 'tutu']
    res.status(200).json(articles)
});
app.get('/articles/:articleId', (req, res, next) => {
    console.log('article n°' + req.params.articleId)
    console.log('valeur : ' + req.query.valeur)
    const articles = ['toto']
    res.status(200).json(articles)
});

//POST
app.post('/articles', (req, res, next) => {
    console.log(req.body.nom)
    res.status(201).json('Créé')
});





//GET /api
// Afficher une catégorie avec son ID
app.get('/api/categories/:catId/produits', (req, res, next) => {
    Categorie.find({
            _id: req.params.catId
        })
        .then(categories =>
            res.status(200).json(categories))
        .catch(error => res.status(400).json({
            error
        }));
});

app.get('/api/produits/:id', (req, res, next) => {
    
    Produit.find({
        _id: req.params.id
    })
    .then(produit =>
        res.status(200).json(produit))
    .catch(error => res.status(400).json({
        error
    }));
    
});

app.get('/api/produits', (req, res, next) => {
    Produit.find()
        .then(produits =>
            res.status(200).json(produits))
        .catch(error => res.status(400).json({
            error
        }));
});

app.get('/api/categories', (req, res, next) => {
    Categorie.find()
        .then(categories =>
            res.status(200).json(categories))
        .catch(error => res.status(400).json({
            error
        }));
});

//POST /api
app.post('/api/produits', (req, res, next) => {
    const produit = new Produit({
        ...req.body
    });
    produit.save().then(() =>
            res.status(201).json({
                message: 'Produit créée !'
            }))
        .catch(error => res.status(400).json({
            error
        }))
});

app.post('/api/categories', (req, res, next) => {
    const categorie = new Categorie({
        ...req.body
    });
    categorie.save().then(() =>
            res.status(201).json({
                message: 'Categorie créée !'
            }))
        .catch(error => res.status(400).json({
            error
        }))
});
module.exports = app;


//PUT /api
app.put('/api/categories/:id', (req, res, next) => {
    Categorie.updateOne({
            _id: req.params.id
        }, {
            ...req.body,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Categorie modifiée !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
});

app.put('/api/produits/:id', (req, res, next) => {
    Produit.updateOne({
            _id: req.params.id
        }, {
            ...req.body,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Produit modifié !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
});

//DELETE /api
app.delete('/api/categories/:id', (req, res, next) => {
    Categorie.deleteOne({
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Categorie supprimée !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
});

app.delete('/api/produits/:id', (req, res, next) => {
    Produit.deleteOne({
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Produit supprimé !'
        }))
        .catch(error => res.status(400).json({
            error
        }));
});