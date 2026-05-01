/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Операции с пользователями системы
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный идентификатор пользователя
 *           example: 1
 *         username:
 *           type: string
 *           description: Имя пользователя
 *           example: "Ruslan_Admin"
 *         email:
 *           type: string
 *           format: email
 *           description: Email пользователя
 *           example: "osmanov@library.com"
 *         password:
 *           type: string
 *           description: Пароль пользователя
 *           example: "secure_pass_123"
 *         role:
 *           type: string
 *           description: Роль пользователя
 *           enum: [admin, reader]
 *           default: reader
 *           example: "admin"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата создания
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Дата обновления
 *     
 *     UserInput:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Имя пользователя
 *           example: "Ruslan_Admin"
 *         email:
 *           type: string
 *           format: email
 *           description: Email пользователя
 *           example: "osmanov@library.com"
 *         password:
 *           type: string
 *           description: Пароль пользователя
 *           example: "secure_pass_123"
 *         role:
 *           type: string
 *           description: Роль пользователя
 *           enum: [admin, reader]
 *           default: reader
 *           example: "admin"
 *     
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Сообщение об ошибке
 * 
 * /api/user:
 *   post:
 *     tags:
 *       - Users
 *     summary: Регистрация нового пользователя
 *     description: Создает нового пользователя в системе
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       '200':
 *         description: Пользователь успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '400':
 *         description: Ошибка валидации (неверные данные)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '500':
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * 
 *   get:
 *     tags:
 *       - Users
 *     summary: Получить список всех пользователей
 *     description: Возвращает список всех зарегистрированных пользователей
 *     responses:
 *       '200':
 *         description: Список пользователей успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       '500':
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    router.post("/", users.create);
    router.get("/", users.findAll);
    app.use('/api/user', router);
};