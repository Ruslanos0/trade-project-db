module.exports = (db) => {
    // Связи для Групп Книг (Жанров)
    db.booksgroups.belongsTo(db.booksgroups, { 
        foreignKey: 'base_books_group', 
        as: 'parentGroup' 
    });

    db.books.belongsTo(db.booksgroups, { 
        foreignKey: 'books_group', 
        as: 'group' 
    });

    // Связи для Прайс-листа
    db.pricelistBooks.belongsTo(db.pricelist, { 
        foreignKey: 'pricelist_id', 
        as: 'relatedPricelist' 
    });
    
    db.pricelistBooks.belongsTo(db.books, { 
        foreignKey: 'book_id', 
        as: 'relatedBooks' 
    });

    // Связи для Заказов
    db.orders.belongsTo(db.pricelist, { 
        foreignKey: 'pricelist_id', 
        as: 'targetPricelist' 
    });

    db.orderItems.belongsTo(db.orders, { 
        foreignKey: 'order_id',
        as: 'parentOrder' 
    });
    
    db.orderItems.belongsTo(db.books, { 
        foreignKey: 'book_id', 
        as: 'item' 
    });

    // Связи для пользователей и книг (многие ко многим)
    db.users.belongsToMany(db.books, {
        through: db.userBooks,
        foreignKey: 'user_id',
        otherKey: 'book_id',
        as: 'userBooks'
    });

    db.books.belongsToMany(db.users, {
        through: db.userBooks,
        foreignKey: 'book_id',
        otherKey: 'user_id',
        as: 'bookUsers'
    });

    // Прямые связи для промежуточной таблицы
    db.userBooks.belongsTo(db.users, {
        foreignKey: 'user_id',
        as: 'user'
    });

    db.userBooks.belongsTo(db.books, {
        foreignKey: 'book_id',
        as: 'book'
    });
};