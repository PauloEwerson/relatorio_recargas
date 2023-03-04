const { Operators } = require('../../../db/models');

const updateOperator = async (id, name, registration) => {
  try {

    const verifyIfExist = await Operators.findOne({ where: { registration } });
    if (verifyIfExist) {
      return {
        success: false,
        message: 'Operador já cadastrado'
      }
    }
    
    const operator = await Operators.findByPk(id);
    if (operator) {
      try {
        await operator.update({ name, registration });
        return {
          success: true,
          message: 'Atualizado com sucesso',
          infoCol: operator
        }
      } catch (err) {
        return {
          success: false,
          message: 'Operador inválido'
        }
      }
    } else {
      return {
        success: false,
        message: 'Operador não encontrado!',
      }
    }
  } catch (err) {
    return {
      success: false,
      message: 'Ocorreu um erro ao atualizar o operador: ' + err.message
    }
  }
}

module.exports = {
  updateOperator,
};