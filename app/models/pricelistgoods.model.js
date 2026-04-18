const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PriceListGoods = sequelize.define("pricelistgoods", {
        price: {
            type: DataTypes.DOUBLE
        },
        priceList: {
            type: Sequelize.INTEGER
        },
        goods: {
            type: Sequelize.INTEGER
        }
    });

    return PriceListGoods;
};