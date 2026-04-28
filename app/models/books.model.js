module.exports = (sequelize, Sequelize) => {
    const Books = sequelize.define("books", {
        name: {
            type: Sequelize.STRING,
            allowNull: false 
        },
        author: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        genre: {   
            type: Sequelize.STRING 
        },
        year: { type: Sequelize.INTEGER },
        
        books_group: {
            type: Sequelize.INTEGER,
            field: 'books_group'
        }
    }, {
        tableName: 'books'
    });

    return Books;
};