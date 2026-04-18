require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./app/models");

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// чтение запросов в формате json
app.use(express.json());

// чтение запросов формата x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Синхронизация с базой данных
// force: true — удаляет существующие таблицы и создает их заново
db.sequelize.sync({ force: true })
    .then(() => {
        console.log("-----------------------------------------");
        console.log("Synced db. Tables have been created!");
        console.log("-----------------------------------------");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// простой тестовый маршрут
app.get("/", (req, res) => {
    res.json({ message: "Welcome to trade-app application." });
});

// использование process.env для установки порта
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});