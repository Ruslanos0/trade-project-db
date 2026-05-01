const db = require("../models");
const UserBooks = db.userBooks;
const User = db.users;
const Books = db.books;

// Добавить книгу к пользователю
exports.addBookToUser = (req, res) => {
    const { userId, bookId, status = 'reading', rating, notes } = req.body;

    if (!userId || !bookId) {
        res.status(400).send({ message: "ID пользователя и ID книги обязательны!" });
        return;
    }

    const userBook = {
        user_id: userId,
        book_id: bookId,
        status: status,
        rating: rating,
        notes: notes
    };

    UserBooks.create(userBook)
        .then(data => {
            res.send({ message: "Книга успешно добавлена к пользователю!", data });
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(400).send({
                    message: "Эта книга уже добавлена к пользователю!"
                });
            } else {
                res.status(500).send({
                    message: err.message || "Ошибка при добавлении книги к пользователю."
                });
            }
        });
};

// Получить все книги пользователя
exports.getUserBooks = (req, res) => {
    const userId = req.params.userId;

    UserBooks.findAll({
        where: { user_id: userId },
        include: [
            {
                model: Books,
                as: 'book',
                attributes: ['id', 'name', 'author', 'description', 'genre', 'year']
            }
        ],
        order: [['added_at', 'DESC']]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ошибка при получении книг пользователя."
            });
        });
};

// Обновить статус книги пользователя
exports.updateUserBook = (req, res) => {
    const { userId, bookId } = req.params;
    const { status, rating, notes } = req.body;

    UserBooks.update(
        { status, rating, notes },
        {
            where: {
                user_id: userId,
                book_id: bookId
            }
        }
    )
        .then(num => {
            if (num == 1) {
                res.send({ message: "Информация о книге обновлена успешно!" });
            } else {
                res.send({ message: "Не удалось обновить информацию о книге." });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ошибка при обновлении информации о книге."
            });
        });
};

// Удалить книгу у пользователя
exports.removeBookFromUser = (req, res) => {
    const { userId, bookId } = req.params;

    UserBooks.destroy({
        where: {
            user_id: userId,
            book_id: bookId
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({ message: "Книга удалена из библиотеки пользователя!" });
            } else {
                res.send({ message: "Не удалось удалить книгу." });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ошибка при удалении книги."
            });
        });
};

// Получить статистику пользователя
exports.getUserStats = (req, res) => {
    const userId = req.params.userId;

    UserBooks.findAll({
        where: { user_id: userId },
        attributes: [
            'status',
            [db.sequelize.fn('COUNT', db.sequelize.col('status')), 'count']
        ],
        group: ['status']
    })
        .then(data => {
            const stats = {
                reading: 0,
                completed: 0,
                wishlist: 0,
                total: 0
            };

            data.forEach(item => {
                stats[item.status] = parseInt(item.dataValues.count);
                stats.total += parseInt(item.dataValues.count);
            });

            res.send(stats);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ошибка при получении статистики пользователя."
            });
        });
};