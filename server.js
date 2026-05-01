require('dotenv').config();
const express = require("express");
const cors = require("cors"); // Подключаем один раз
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const db = require("./app/models");
const app = express();
app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: true })
.then(() => {
    console.log("Synced db with force: true. Database recreated.");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message); 
    console.log(err);
});


app.get("/", (req, res) => {
    res.json({ message: "Welcome to trade-app application." });
});
require("./app/routers/booksgroup.routers.js")(app);
require("./app/routers/books.routers.js")(app);
require("./app/routers/pricelist.routers")(app);
require("./app/routers/pricelistbooks.routers.js")(app);
require("./app/routers/purchase.routers")(app);
require("./app/routers/purchasebooks.routers.js")(app);
require("./app/routers/user.routers")(app);
require("./app/routers/user-books.routers.js")(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.NODE_DOCKER_PORT || 8080;
const EXTERNAL_PORT = 6868;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library-APP API',
            version: '1.0.0',
            description: 'API documentation for the Internet Library project',
        },
        servers: [
            {
                url: "http://localhost:6868",
            },
        ],
    },
    apis: ['./app/routers/*.routers.js'], 
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});