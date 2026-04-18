const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.goods = require("./goods.model.js")(sequelize, Sequelize);
db.goodsGroup = require("./goods-group.model.js")(sequelize, Sequelize);
db.pricelist = require("./pricelist.model.js")(sequelize, Sequelize);
db.pricelistGoods = require("./pricelistgoods.model.js")(sequelize, Sequelize);
db.purchase = require("./purchase.model.js")(sequelize, Sequelize);
db.purchaseGoods = require("./purchasegoods.model.js")(sequelize, Sequelize);

require('./references.model.js')(db);

module.exports = db;