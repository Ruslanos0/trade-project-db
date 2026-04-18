module.exports = (sequelize, Sequelize) => {
    const Goods = sequelize.define("goods", {
        code: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        articul: {
            type: Sequelize.INTEGER
        },
        goodsgroup: {
            type: Sequelize.INTEGER
        }
    });

    Goods.belongsTo(GoodsGroup, { foreignKey: 'goodsGroup' });

    return Goods;
};