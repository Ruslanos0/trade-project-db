module.exports = app => {

    const booksGroup = require("../controllers/booksgroup.controller.js")

    var router = require("express").Router();

    // Create a new BooksGroup
    router.post("/", booksGroup.create);

    // Retrieve all BooksGroup
    router.get("/", booksGroup.findAll);

    // Retrieve a single BooksGroup with id
    router.get("/:id", booksGroup.findOne);

    // Update a BooksGroup with id
    router.put("/:id", booksGroup.update);

    // Delete a BooksGroup with id
    router.delete("/:id", booksGroup.delete);

    // Delete all BooksGroups
    router.delete("/", booksGroup.deleteAll);

    app.use('/api/booksgroups', router);
};