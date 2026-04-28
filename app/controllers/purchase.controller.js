const db = require("../models");
const Purchase = db.purchases;

exports.create = (req, res) => {
    const purchase = {
        purchaseDate: req.body.purchaseDate,
        invoiceDate: req.body.invoiceDate,
        priceList: req.body.priceList // К какому прайсу относится закупка
    };
    Purchase.create(purchase)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
    Purchase.findAll().then(data => res.send(data));
};

exports.delete = (req, res) => {
    Purchase.destroy({ where: { id: req.params.id } }).then(() => res.send({ message: "Deleted" }));
};