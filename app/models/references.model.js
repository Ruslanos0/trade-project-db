module.exports = (db) => {
    // GoodsGroup references
    db.goodsGroup.belongsTo(db.goodsGroup, { foreignKey: 'baseGoodsGroup' });

    // Goods references
    db.goods.belongsTo(db.goodsGroup, { foreignKey: 'goodsGroup' });

    // pricelistgoods
    db.pricelistGoods.belongsTo(db.pricelist, { foreignKey: 'pricelist' });
    db.pricelistGoods.belongsTo(db.goods, { foreignKey: 'goods' });
    //purchase 
    db.purchase.belongsTo(db.pricelist, { foreignKey: 'priceList' });
    //purchasegoods
    db.purchaseGoods.belongsTo(db.purchase, { foreignKey: 'purchaseId' });
    db.purchaseGoods.belongsTo(db.goods, { foreignKey: 'goods' });
};