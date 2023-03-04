const { DataTables } = require('../../../db/models');

const getDataReport = async () => {
  try {
    const allDataTable = await DataTables.findAll();

    if (allDataTable.length > 0) {
      const lastUpdate = await DataTables.max('updatedAt')
      .then(max => {
          return max.toLocaleString()
      })
      return {
        success: true,
        infoCol: allDataTable,
        lastUpdate,
      }
    }

    return {
      success: true,
      infoCol: allDataTable,
    }
  } catch(err) {
    return { success: false, message: 'Ocorreu um erro ao buscar os dados: ' + err.message}
  }
};

module.exports = {
  getDataReport,
};
