const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PurchaseGoods = sequelize.define("purchasegoods", {
        amount: {
            type: DataTypes.DOUBLE
        },
        purchaseId: {
            type: DataTypes.INTEGER
        },
        goods: {
            type: Sequelize.INTEGER
        }
    });

    return PurchaseGoods;
};  