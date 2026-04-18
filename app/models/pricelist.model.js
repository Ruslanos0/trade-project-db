const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const PriceList = sequelize.define("pricelist", {
        category: {
            type: Sequelize.STRING
        },
        date: {
            type: DataTypes.DATE
        }
    });

    return PriceList;
};