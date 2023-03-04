module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Operators', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registration: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      }
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Operators');
  }
};