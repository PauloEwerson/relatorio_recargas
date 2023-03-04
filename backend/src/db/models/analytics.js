module.exports = (sequelize, DataTypes) => {
  const createAnalytics = sequelize.define('Analytics', {
    id : {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    meta: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  },
  {
    timestamps: true,
  });

  return createAnalytics;
}
