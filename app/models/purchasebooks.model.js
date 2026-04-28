const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const OrderItem = sequelize.define("order_item", {
        amount: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        order_id: {
            type: DataTypes.INTEGER,
            field: 'order_id'
        },
        // ID книги
        book_id: {
            type: DataTypes.INTEGER,
            field: 'book_id'
        }
    }, {
        tableName: 'order_items',
        underscored: true
    });

    return OrderItem;
};