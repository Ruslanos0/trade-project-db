module.exports = (db) => {
    // GoodsGroup references
    db.goodsGroup.belongsTo(db.goodsGroup, { foreignKey: 'baseGoodsGroup' });

    // Goods references
    db.goods.belongsTo(db.goodsGroup, { foreignKey: 'goodsGroup' });

    // pricelistgoods references
    db.pricelistGoods.belongsTo(db.pricelist, { foreignKey: 'pricelist' });
    db.pricelistGoods.belongsTo(db.goods, { foreignKey: 'goods' });
};