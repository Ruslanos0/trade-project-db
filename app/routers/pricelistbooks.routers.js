module.exports = app => {
    const plBooks = require("../controllers/pricelistbooks.controller.js");
    var router = require("express").Router();

    router.post("/", plBooks.create);
    router.get("/", plBooks.findAll);
    router.delete("/:id", plBooks.delete);

    app.use('/api/pricelistbooks', router);
};
