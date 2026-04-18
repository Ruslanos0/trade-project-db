const db = require("../models");
const GoodsGroup = db.goodsGroup;
const Op = db.Sequelize.Op;

// 1. Твой метод из методички (Create)
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    const goodsGroup = {
        name: req.body.title,
        description: req.body.description,
        baseGoodsGroup: req.body.baseGoodsGroup
    };
    GoodsGroup.create(goodsGroup)
        .then(data => { res.send(data); })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error occurred." });
        });
};

exports.findAll = (req, res) => {
    GoodsGroup.findAll().then(data => res.send(data));
};

exports.findOne = (req, res) => {
    GoodsGroup.findByPk(req.params.id).then(data => res.send(data));
};

exports.update = (req, res) => {
    GoodsGroup.update(req.body, { where: { id: req.params.id } })
        .then(() => res.send({ message: "Updated" }));
};

exports.delete = (req, res) => {
    GoodsGroup.destroy({ where: { id: req.params.id } })
        .then(() => res.send({ message: "Deleted" }));
};

exports.deleteAll = (req, res) => {
    GoodsGroup.destroy({ where: {}, truncate: false })
        .then(() => res.send({ message: "All deleted" }));
};