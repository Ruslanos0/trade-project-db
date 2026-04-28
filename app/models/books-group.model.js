module.exports = (sequelize, Sequelize) => {
    const BooksGroup = sequelize.define("booksgroup", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        baseBooksGroup: {
            type: Sequelize.INTEGER
        }
    });

    return BooksGroup;
};