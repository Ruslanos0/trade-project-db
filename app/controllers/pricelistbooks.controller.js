const db = require("../models");
const PriceListbooks = db.priceListbooks;

exports.create = (req, res) => {
    const plbooks = {
        price: req.body.price,
        books: req.body.books,     // ID товара
        pricelist: req.body.pricelist // ID прайс-листа
    };
    PriceListbooks.create(plbooks)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
    PriceListbooks.findAll().then(data => res.send(data));
};

exports.delete = (req, res) => {
    PriceListbooks.destroy({ where: { id: req.params.id } }).then(() => res.send({ message: "Deleted" }));
};