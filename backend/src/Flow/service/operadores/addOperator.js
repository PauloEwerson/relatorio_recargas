const { Operators } = require('../../../db/models');

// consulta se o operador já está cadastrado no banco de dados
const verifyIfOperatorExists = async (registration) => {
  const operator = await Operators.findOne({
    where: { registration }
  });

  if (operator) {
    return {
      success: false,
      message: 'Operador já cadastrado',
    }
  }

  return { success: true };
}

// Cria o operador
const addOperator = async (name, registration) => {
  try {
    const operators = await Operators.create({name, registration});
    return { success: true, message: 'Operador criado com sucesso', infoCol: operators}
  } catch(err) {
    return { success: false, message: 'Ocorreu um erro ao criar o usuário: ' + err.message}
  }
};

module.exports = {
  verifyIfOperatorExists,
  addOperator,
};