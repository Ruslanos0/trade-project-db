const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    define: {
        underscored: true, 
    },
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

// Подключение моделей
db.booksgroups = require("./books-group.model.js")(sequelize, Sequelize);
db.books = require("./books.model.js")(sequelize, Sequelize);
db.pricelist = require("./pricelist.model.js")(sequelize, Sequelize);
db.pricelistBooks = require("./pricelistbooks.model.js")(sequelize, Sequelize);
db.orders = require("./purchase.model.js")(sequelize, Sequelize);
db.orderItems = require("./purchasebooks.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

// Подключение связей
require('./references.model.js')(db);

module.exports = db;