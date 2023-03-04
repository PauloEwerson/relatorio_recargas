const { Operators } = require('../../../db/models');

const getSingleOperator = async (id) => {
  try {
    const operators = await Operators.findByPk(id);
    if (operators) {
      return {
        success: true,
        message: '',
        infoCol: operators,
      }
    } else {
      return {
        success: false,
        message: 'Operador não encontrado',
      }
    } 
  } catch (err) {
    return {
      success: false,
      message: 'Ocorreu um erro ao criar o usuário: ' + err.message
    }
  }
};

module.exports = {
  getSingleOperator,
};