/** JSDoc
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */
module.exports = (sequelize, DataTypes) => {
  const createDataTable = sequelize.define('Operators', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    registration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    }
  },{
    timestamps: false,
  }
  );

  return createDataTable;
}