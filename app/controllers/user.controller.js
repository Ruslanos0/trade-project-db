const db = require("../models");
const User = db.users;
// User Controller
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

exports.findAll = (_req, res) => {
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