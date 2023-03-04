module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DataTables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      loja: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      data: {
        type: Sequelize.DATE,
        allowNull: true
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: true
      },
      pdv: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nsuTef: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      nsuHost: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      transacao: {
        type: Sequelize.STRING,
        allowNull: true
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: true
      },
      codResp: {
        type: Sequelize.STRING,
        allowNull: true
      },
      autorizadora: {
        type: Sequelize.STRING,
        allowNull: true
      },
      concessionariaIntegrador: {
        type: Sequelize.STRING,
        allowNull: true
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      valor: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true
      },
      nsuSitefPagto: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lojaConc: {
        type: Sequelize.STRING,
        allowNull: true
      },
      operador: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      usuarioPend: {
        type: Sequelize.STRING,
        allowNull: true
      },
      dataPend: {
        type: Sequelize.DATE,
        allowNull: true
      },
      horaPend: {
        type: Sequelize.TIME,
        allowNull: true
      },
      cupomFiscal: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      horaFiscal: {
        type: Sequelize.TIME,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DataTables');
  }
};
