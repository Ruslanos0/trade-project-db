const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PriceListBook = sequelize.define("pricelist_book", {
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            defaultValue: 0.0
        },
        // ID прайс-листа
        pricelist_id: {
            type: Sequelize.INTEGER,
            field: 'pricelist_id'
        },
        // ID книги
        book_id: {
            type: Sequelize.INTEGER,
            field: 'book_id'
        }
    }, {
        tableName: 'pricelist_books',
        underscored: true
    });

    return PriceListBook;
};