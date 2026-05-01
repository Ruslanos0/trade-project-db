module.exports = (sequelize, Sequelize) => {
    const UserBooks = sequelize.define("user_books", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        book_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'books',
                key: 'id'
            }
        },
        added_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'reading', // reading, completed, wishlist
            validate: {
                isIn: [['reading', 'completed', 'wishlist']]
            }
        },
        rating: {
            type: Sequelize.INTEGER,
            validate: {
                min: 1,
                max: 5
            },
            allowNull: true
        },
        notes: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'user_books',
        indexes: [
            {
                unique: true,
                fields: ['user_id', 'book_id']
            }
        ]
    });

    return UserBooks;
};