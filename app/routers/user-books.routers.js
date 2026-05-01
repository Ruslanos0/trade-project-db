/**
 * @swagger
 * tags:
 *   - name: UserBooks
 *     description: Управление книгами пользователей
 * 
 * components:
 *   schemas:
 *     UserBook:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный идентификатор записи
 *         user_id:
 *           type: integer
 *           description: ID пользователя
 *         book_id:
 *           type: integer
 *           description: ID книги
 *         status:
 *           type: string
 *           enum: [reading, completed, wishlist]
 *           description: Статус чтения книги
 *           example: "reading"
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Оценка книги (1-5)
 *           example: 4
 *         notes:
 *           type: string
 *           description: Заметки пользователя о книге
 *           example: "Отличная книга!"
 *         added_at:
 *           type: string
 *           format: date-time
 *           description: Дата добавления книги
 *     
 *     UserBookInput:
 *       type: object
 *       required:
 *         - userId
 *         - bookId
 *       properties:
 *         userId:
 *           type: integer
 *           description: ID пользователя
 *           example: 1
 *         bookId:
 *           type: integer
 *           description: ID книги
 *           example: 1
 *         status:
 *           type: string
 *           enum: [reading, completed, wishlist]
 *           default: reading
 *           description: Статус чтения книги
 *           example: "reading"
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Оценка книги (1-5)
 *           example: 4
 *         notes:
 *           type: string
 *           description: Заметки пользователя о книге
 *           example: "Отличная книга!"
 *     
 *     UserStats:
 *       type: object
 *       properties:
 *         reading:
 *           type: integer
 *           description: Количество книг в процессе чтения
 *         completed:
 *           type: integer
 *           description: Количество прочитанных книг
 *         wishlist:
 *           type: integer
 *           description: Количество книг в списке желаний
 *         total:
 *           type: integer
 *           description: Общее количество книг
 * 
 * /api/user-books:
 *   post:
 *     tags:
 *       - UserBooks
 *     summary: Добавить книгу к пользователю
 *     description: Добавляет книгу в библиотеку пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserBookInput'
 *     responses:
 *       '200':
 *         description: Книга успешно добавлена
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/UserBook'
 *       '400':
 *         description: Ошибка валидации или книга уже добавлена
 *       '500':
 *         description: Внутренняя ошибка сервера
 * 
 * /api/user-books/{userId}:
 *   get:
 *     tags:
 *       - UserBooks
 *     summary: Получить все книги пользователя
 *     description: Возвращает список всех книг пользователя с подробной информацией
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     responses:
 *       '200':
 *         description: Список книг пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/UserBook'
 *                   - type: object
 *                     properties:
 *                       book:
 *                         $ref: '#/components/schemas/Book'
 *       '500':
 *         description: Внутренняя ошибка сервера
 * 
 * /api/user-books/{userId}/{bookId}:
 *   put:
 *     tags:
 *       - UserBooks
 *     summary: Обновить информацию о книге пользователя
 *     description: Обновляет статус, оценку или заметки о книге
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID книги
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [reading, completed, wishlist]
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               notes:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Информация обновлена успешно
 *       '500':
 *         description: Внутренняя ошибка сервера
 * 
 *   delete:
 *     tags:
 *       - UserBooks
 *     summary: Удалить книгу из библиотеки пользователя
 *     description: Удаляет книгу из личной библиотеки пользователя
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID книги
 *     responses:
 *       '200':
 *         description: Книга удалена успешно
 *       '500':
 *         description: Внутренняя ошибка сервера
 * 
 * /api/user-books/{userId}/stats:
 *   get:
 *     tags:
 *       - UserBooks
 *     summary: Получить статистику пользователя
 *     description: Возвращает статистику по книгам пользователя
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID пользователя
 *     responses:
 *       '200':
 *         description: Статистика пользователя
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserStats'
 *       '500':
 *         description: Внутренняя ошибка сервера
 */

module.exports = app => {
    const userBooks = require("../controllers/user-books.controller.js");
    var router = require("express").Router();

    // Добавить книгу к пользователю
    router.post("/", userBooks.addBookToUser);

    // Получить все книги пользователя
    router.get("/:userId", userBooks.getUserBooks);

    // Получить статистику пользователя
    router.get("/:userId/stats", userBooks.getUserStats);

    // Обновить информацию о книге пользователя
    router.put("/:userId/:bookId", userBooks.updateUserBook);

    // Удалить книгу у пользователя
    router.delete("/:userId/:bookId", userBooks.removeBookFromUser);

    app.use('/api/user-books', router);
};