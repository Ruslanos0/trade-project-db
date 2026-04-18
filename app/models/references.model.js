module.exports = (db) => {
    // GoodsGroup references
    db.goodsGroup.belongsTo(db.goodsGroup, { foreignKey: 'baseGoodsGroup', as: 'parentGroup' });

    // Goods references
    db.goods.belongsTo(db.goodsGroup, { foreignKey: 'goodsGroup', as: 'group' });

    // pricelistgoods
    // МЕНЯЕМ ТУТ: добавляем 'as', чтобы не было конфликта с полем 'pricelist'
    db.pricelistGoods.belongsTo(db.pricelist, { foreignKey: 'pricelist', as: 'relatedPricelist' });
    db.pricelistGoods.belongsTo(db.goods, { foreignKey: 'goods', as: 'relatedGoods' });

    // purchase 
    db.purchase.belongsTo(db.pricelist, { foreignKey: 'priceList', as: 'targetPricelist' });

    // purchasegoods
    db.purchaseGoods.belongsTo(db.purchase, { foreignKey: 'purchaseId', as: 'parentPurchase' });
    db.purchaseGoods.belongsTo(db.goods, { foreignKey: 'goods', as: 'item' });
};