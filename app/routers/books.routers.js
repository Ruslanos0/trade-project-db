module.exports = (app) => {
const books = require("../controllers/books.controller.js");
var router = require("express").Router();


/**
   * @swagger
   * components:
   *   schemas:
   *     Book:
   *       type: object
   *       required:
   *         - name
   *       properties:
   *         id:
   *           type: integer
   *           example: 1
   *         name:
   *           type: string
   *           example: "Мастер и Маргарита"
   *         author:
   *           type: string
   *           example: "Михаил Булгаков"
   *         genre:
   *           type: string
   *           example: "Роман"
   *         year:  
   *           type: integer
   *           example: "1940"
   *         description:
   *           type: string
   *           example: "Классика русской литературы"
   *         id_category:
   *           type: integer
   *           example: 1
   *         provider:
   *           type: string
   *           example: "Издательство Эксмо"
   */

/**
   * @swagger
   * /api/book:
   *   post:
   *     summary: Create new Book
   *     tags: [Books]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Book'
   *     responses:
   *       200:
   *         description: Book created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   */
/**
   *  @swagger
   *  /api/book/paged:
   *    get:
   *      summary: Retrieve a paged list of books
   *      tags: [Books]
   *      parameters:
   *        - in: query
   *          name: page
   *          schema:
   *            type: integer
   *            description: Page number
   *        - in: query
   *          name: size
   *          schema:
   *            type: integer
   *            description: Number of items per page
   *      responses:
   *        200:
   *          description: A paged list of books
   */
router.get("/paged", books.findAllPaged); 

router.post("/", books.create);

/**
   * @swagger
   * /api/book:
   *   get:
   *     summary: Retrieve a list of books
   *     tags: [Books]
   *     responses:
   *       200:
   *         description: A list of books
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Book'
   */
router.get("/", books.findAll);

/**
   * @swagger
   * /api/book/{id}:
   *   get:
   *     summary: Get book by ID
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *         description: The book ID
   *     responses:
   *       200:
   *         description: Book found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Book'
   *       404:
   *         description: Book not found
   */
router.get("/:id", books.findOne);

/**
   * @swagger
   * /api/book/{id}:
   *   put:
   *     summary: Update book by ID
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The book ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Book'
   *     responses:
   *       200:
   *         description: Book updated
   */
router.put("/:id", books.update);

/**
   * @swagger
   * /api/book/{id}:
   *   delete:
   *     summary: Delete book by ID
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The book ID
   *     responses:
   *       200:
   *         description: Book deleted
   *       404:
   *         description: Book not found
   */
router.delete("/:id", books.delete);

/**
   * @swagger
   * /api/book:
   *   delete:
   *     summary: Delete all books
   *     tags: [Books]
   *     responses:
   *       200:
   *         description: All books deleted
   */
router.delete("/", books.deleteAll);

/**
   * @swagger
   * /api/book/{id}/getbooksgroup:
   *   get:
   *     summary: Get book group by book ID
   *     tags: [Books]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The book ID
   *     responses:
   *       200:
   *         description: Book group found
   */
router.get("/:id/getbooksgroup", books.getBookGroup);

app.use("/api/book", router);
console.log("router for /api/book initialized");
};