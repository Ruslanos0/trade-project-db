const db = require("../models");
const GoodsGroup = db.goodsGroup;
const Op = db.Sequelize.Op;

// Create and Save a new GoodsGroup
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a GoodsGroup
    const goodsGroup = {
        name: req.body.title,
        description: req.body.description,
        baseGoodsGroup: req.body.baseGoodsGroup
    };

    // Save GoodsGroup in the database
    GoodsGroup.create(goodsGroup)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the GoodsGroup."
            });
        });
};