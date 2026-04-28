const db = require("../models");
const User = db.users;
/**
 * @swagger
tags:
*  - name: Users
*   description: Операции с пользователями системы
*paths:
*  /api/user:
*    post:
*      tags:
*        - Users
*      summary: Регистрация нового пользователя
*      requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              properties:
*                username:
*                  type: string
*                  example: "Ruslan_Admin"
*                email:
*                  type: string
*                  example: "osmanov@library.com"
*                password:
*                  type: string
*                  example: "secure_pass_123"
*                role:
*                  type: string
*                  example: "admin"
*      responses:
*        '200':
*          description: Пользователь успешно создан
*        '400':
*          description: Ошибка валидации (неверные данные)
*
*    get:
*      tags:
*        - Users
*      summary: Получить список всех пользователей
*      responses:
*        '200':
*          description: Список пользователей получен
*          content:
*            application/json:
*              schema:
*                type: array
*                items:
*                  type: object
*                  properties:
*                    id:
*                      type: integer
*                    username:
*                      type: string
*                    role:
*                      type: string
*/
exports.create = (req, res) => {
    // Валидация запроса
    if (!req.body.username) {
        res.status(400).send({ message: "Имя пользователя не может быть пустым!" });
        return;
    }
    const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password, 
        role: req.body.role || "reader"
    };
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Произошла ошибка при создании пользователя."
            });
        });
};

exports.findAll = (req, res) => {
    User.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ошибка при получении списка пользователей."
            });
        });
};