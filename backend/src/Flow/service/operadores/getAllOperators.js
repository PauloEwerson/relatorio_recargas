const { Operators } = require('../../../db/models');

const getAllOperators = async () => {
  try {
    const allOperators = await Operators.findAll();
    return {
      success: true,
      infoCol: allOperators
    }
  } catch(err) {
    return { success: false, message: 'Ocorreu um erro ao buscar os operadores: ' + err.message}
  }
};

module.exports = {
  getAllOperators,
};