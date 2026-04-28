const db = require("../models");
const BookGroup = db.booksgroups || db.booksgroup || db.BookGroup; 
const Op = db.Sequelize.Op;

// 1. Создать новую категорию книг
exports.create = (req, res) => {
    // Валидация: название категории обязательно
    if (!req.body.name) {
        res.status(400).send({
            message: "Название категории не может быть пустым!"
        });
        return;
    }

    // Объект категории
    const bookGroup = {
        name: req.body.name,
        description: req.body.description,
        // Ссылка на родительскую категорию (если есть вложенность, например: Фантастика -> Научная фантастика)
        base_books_group: req.body.base_books_group ? req.body.base_books_group : null
    };

    // Сохранение в БД
    BookGroup.create(bookGroup)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Произошла ошибка при создании категории."
            });
        });
};

// 2. Получить все категории
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

    BookGroup.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ошибка при получении списка категорий."
            });
        });
};

// 3. Найти категорию по ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    BookGroup.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Категория с id=${id} не найдена.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка при получении категории с id=" + id
            });
        });
};

// 4. Обновить категорию по ID
exports.update = (req, res) => {
    const id = req.params.id;

    BookGroup.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Категория успешно обновлена." });
            } else {
                res.send({ message: `Не удалось обновить категорию id=${id}. Возможно, она не найдена или тело запроса пустое.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка при обновлении категории id=" + id
            });
        });
};

// 5. Удалить категорию по ID
exports.delete = (req, res) => {
    const id = req.params.id;

    BookGroup.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Категория удалена!" });
            } else {
                res.send({ message: `Не удалось удалить категорию id=${id}. Возможно, она уже удалена.` });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ошибка при удалении категории id=" + id
            });
        });
};

// 6. Удалить ВСЕ категории
exports.deleteAll = (req, res) => {
    BookGroup.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `Удалено категорий: ${nums}.` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ошибка при удалении всех категорий."
            });
        });
};