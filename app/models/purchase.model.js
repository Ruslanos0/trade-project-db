const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Purchase = sequelize.define("purchase", {
        purchaseDate: {
            type: DataTypes.DATE
        },
        invoiceDate: {
            type: DataTypes.DATE
        },
        priceList: {
            type: Sequelize.INTEGER
        }
    });

    return Purchase;
};