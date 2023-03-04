/** JSDoc
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
  const createDataTable = sequelize.define('DataTables', {
    id : {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    loja: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hora: {
      allowNull: true,
      type: DataTypes.TIME,
    },
    pdv: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    nsuTef: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    nsuHost: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    transacao: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    estado: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    codResp: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    autorizadora: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    concessionariaIntegrador: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    telefone: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    valor: {
      allowNull: true,
      type: DataTypes.DECIMAL(10,2),
    },
    nsuSitefPagto: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    lojaConc: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    operador: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    usuarioPend: {
      allowNull: true,
      type: DataTypes.STRING(255),
    },
    dataPend: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    horaPend: {
      allowNull: true,
      type: DataTypes.TIME,
    },
    cupomFiscal: {
      allowNull: true,
      type: DataTypes.INTEGER,
    },
    horaFiscal: {
      allowNull: true,
      type: DataTypes.TIME,
    }},
    {
      timestamps: true,
    });

  return createDataTable;
}
// 'loja',
// 'data',
// 'hora',
// 'pdv',
// 'nsuTef',
// 'nsuHost',
// 'transacao',
// 'estado',
// 'codResp',
// 'autorizadora',
// 'concessionariaIntegrador',
// 'telefone',
// 'valor',
// 'nsuSitefPagto',
// 'lojaConc',
// 'operador',
// 'usuarioPend',
// 'dataPend',
// 'horaPend',
// 'cupomFiscal',
// 'horaFiscal'