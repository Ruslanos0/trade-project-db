module.exports = app => {
    const purchase = require("../controllers/purchase.controller.js");
    var router = require("express").Router();

    router.post("/", purchase.create);
    router.get("/", purchase.findAll);
    router.delete("/:id", purchase.delete);

    app.use('/api/purchases', router);
};