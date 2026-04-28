module.exports = app => {
    const pricelist = require("../controllers/pricelist.controller.js");
    var router = require("express").Router();

    router.post("/", pricelist.create);
    router.get("/", pricelist.findAll);
    router.get("/:id", pricelist.findOne);
    router.put("/:id", pricelist.update);
    router.delete("/:id", pricelist.delete);

    app.use('/api/pricelists', router);
};