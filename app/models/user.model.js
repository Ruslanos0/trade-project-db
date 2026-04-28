
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true // Уникальное имя пользователя
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: { isEmail: true }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false 
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: "reader" 
        }
    });
    return User;
};