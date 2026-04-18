module.exports = (db) => {

    // GoodsGroup references
    db.goodsGroup.belongsTo(db.goodsGroup, { foreignKey: 'baseGoodsGroup' });

    // Goods references
    db.goods.belongsTo(db.goodsGroup, { foreignKey: 'goodsGroup' });
};