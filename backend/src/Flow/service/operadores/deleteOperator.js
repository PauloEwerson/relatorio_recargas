const { Operators } = require('../../../db/models');

const deleteOperator = async (id) => {
  try {
    const numDeleted = await Operators.destroy({ where: { id } });
    if (numDeleted) {
      return { 
        success: true,
        message: 'Deletado com sucesso',
      }
    } else {
      return {
        success: false,
        message: 'Não encontrado',
      }
    }
  } catch (err) {
    return {
      success: false,
      message: 'Ocorreu um erro ao criar o usuário: ' + err.message
    }
  }
}

module.exports = {
  deleteOperator,
};