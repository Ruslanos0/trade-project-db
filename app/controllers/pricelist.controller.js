const db = require("../models");
const PriceList = db.priceLists;

exports.create = (req, res) => {
    const pricelist = {
        category: req.body.category,
        date: req.body.date
    };
    PriceList.create(pricelist)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findAll = (req, res) => {
    PriceList.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

exports.findOne = (req, res) => {
    PriceList.findByPk(req.params.id).then(data => res.send(data));
};

exports.update = (req, res) => {
    PriceList.update(req.body, { where: { id: req.params.id } }).then(() => res.send({ message: "Updated" }));
};

exports.delete = (req, res) => {
    PriceList.destroy({ where: { id: req.params.id } }).then(() => res.send({ message: "Deleted" }));
};