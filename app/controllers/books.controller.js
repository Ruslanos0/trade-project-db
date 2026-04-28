const db = require("../models");
const Books = db.books;
const BooksGroup = db.booksgroup;
const { QueryTypes } = require('sequelize');

// 1. Создание книги 
exports.create = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ message: "Название не может быть пустым!" });
    }
    const bookData = {
        name: req.body.name,
        author: req.body.author, 
        genre: req.body.genre,
        year: req.body.year,
        description: req.body.description,
        books_group: req.body.books_group || null
    };
    Books.create(bookData)
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

// 2. Получение всех книг
exports.findAll = (req, res) => {
    Books.findAll()
        .then(data => res.send(data))
        .catch(err => res.status(500).send({ message: err.message }));
};

// 3. Получение одной книги по ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Books.findByPk(id)
        .then(data => {
            if (data) res.send(data);
            else res.status(404).send({ message: `Книга с id=${id} не найдена` });
        })
        .catch(err => res.status(500).send({ message: "Ошибка при получении книги с id=" + id }));
};

// 4. Обновление книги 
exports.update = (req, res) => {
    const id = req.params.id;
    Books.update(req.body, { where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Данные книги обновлены успешно." });
            else res.send({ message: `Не удалось обновить книгу с id=${id}. Возможно, данных нет.` });
        })
        .catch(err => res.status(500).send({ message: "Ошибка при обновлении id=" + id }));
};

// 5. Удаление одной книги
exports.delete = (req, res) => {
    const id = req.params.id;
    Books.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) res.send({ message: "Книга удалена." });
            else res.send({ message: "Не удалось удалить книгу." });
        })
        .catch(err => res.status(500).send({ message: "Ошибка при удалении id=" + id }));
};

// 6. Удаление ВСЕХ книг
exports.deleteAll = (req, res) => {
    Books.destroy({ where: {}, truncate: false })
        .then(nums => res.send({ message: `Успешно удалено книг: ${nums}.` }))
        .catch(err => res.status(500).send({ message: err.message }));
};

// 7. Получение группы книги
exports.getBookGroup = (req, res) => {
    const id = req.params.id;
    db.sequelize.query(
        'SELECT gg.* FROM "booksgroups" gg JOIN "books" b ON gg."id" = b."books_group" WHERE b."id" = :id', 
        {
            replacements: { id: id },
            type: QueryTypes.SELECT
        }
    )
    .then(result => res.send(result[0] || {}))
    .catch(err => res.status(500).send({ message: "Ошибка SQL: " + err.message }));
};

// 8. Поиск по автору
exports.findByAuthor = (req, res) => {
    const author = '%' + (req.query.author || '') + '%';
    db.sequelize.query(
        'SELECT * FROM "books" WHERE "author" ILIKE :author',
        {
            replacements: { author: author },
            type: QueryTypes.SELECT,
            model: Books,
            mapToModel: true
        }
    ).then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};

// 9. Поиск по названию (ILIKE)
exports.searchByName = (req, res) => {
    const namePart = '%' + (req.query.name || '') + '%';
    db.sequelize.query(
        'SELECT * FROM "books" WHERE "name" ILIKE :name', 
        {
            replacements: { name: namePart },
            type: QueryTypes.SELECT,
            model: Books,
            mapToModel: true
        }
    ).then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};

// 10. Последние 3 книги
exports.findLatest = (req, res) => {
    db.sequelize.query(
        'SELECT * FROM "books" ORDER BY "createdAt" DESC LIMIT 3',
        {
            type: QueryTypes.SELECT,
            model: Books,
            mapToModel: true
        }
    ).then(data => res.send(data)).catch(err => res.status(500).send({ message: err.message }));
};

exports.findAllPaged = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const size = parseInt(req.query.size) || 10; 
    const offset = (page - 1) * size;

    try {
        const { count, rows } = await db.books.findAndCountAll({
            limit: size,
            offset: offset
        });

        res.json({
            totalItems: count,
            totalPages: Math.ceil(count / size),
            currentPage: page,
            items: rows,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};