module.exports = app => {
    const pBooks = require("../controllers/purchasebooks.controller.js");
    var router = require("express").Router();

    router.post("/", pBooks.create);
    router.get("/", pBooks.findAll);
    router.delete("/:id", pBooks.delete);

    app.use('/api/purchasebooks', router);
};