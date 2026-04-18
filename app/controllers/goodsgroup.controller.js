const db = require("../models");
const GoodsGroup = db.goodsGroup;
const Op = db.Sequelize.Op;

// Create and Save a new GoodsGroup
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const goodsGroup = {
        name: req.body.title,
        description: req.body.description,
        baseGoodsGroup: req.body.baseGoodsGroup
    };

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

// Retrieve all GoodsGroup from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    GoodsGroup.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Goods groups."
            });
        });
};

// Find a single GoodsGroup with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    GoodsGroup.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find GoodsGroup with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving GoodsGroup with id=" + id
            });
        });
};

// Update a GoodsGroup by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    GoodsGroup.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "GoodsGroup was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update GoodsGroup with id=${id}. Maybe GoodsGroup was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating GoodsGroup with id=" + id
            });
        });
};

// Delete a GoodsGroup with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    GoodsGroup.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "GoodsGroup was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete GoodsGroup with id=${id}. Maybe GoodsGroup was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete GoodsGroup with id=" + id
            });
        });
};

// Delete all GoodsGroups from the database.
exports.deleteAll = (req, res) => {
    GoodsGroup.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} GoodsGroups were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all groups."
            });
        });
};