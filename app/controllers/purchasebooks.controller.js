const db = require("../models");
const Purchasebooks = db.purchasebooks;

exports.create = (req, res) => {
    const pbooks = {
        amount: req.body.amount,
        purchaseId: req.body.purchaseId, // ID закупки
        books: req.body.books           // ID товара
    };
    Purchasebooks.create(pbooks)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
    Purchasebooks.findAll().then(data => res.send(data));
};

exports.delete = (req, res) => {
    Purchasebooks.destroy({ where: { id: req.params.id } }).then(() => res.send({ message: "Deleted" }));
};