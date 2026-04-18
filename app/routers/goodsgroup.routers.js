module.exports = app => {

    const goodsGroup = require("../controllers/goodsgroup.controller.js")

    var router = require("express").Router();

    // Create a new GoodsGroup
    router.post("/", goodsGroup.create);

    // Retrieve all GoodsGroup
    router.get("/", goodsGroup.findAll);

    // Retrieve a single GoodsGroup with id
    router.get("/:id", goodsGroup.findOne);

    // Update a GoodsGroup with id
    router.put("/:id", goodsGroup.update);

    // Delete a GoodsGroup with id
    router.delete("/:id", goodsGroup.delete);

    // Delete all GoodsGroups
    router.delete("/", goodsGroup.deleteAll);

    app.use('/api/goodsgroups', router);
};