const { Analytics } = require('../../../db/models');

const getMeta = async () => {
  try {
    const meta = await Analytics.findOne();
    if (meta) {
      return {
        success: true,
        infoCol: meta,
      }
    } else {
      return {
        success: false,
        message: 'Meta não encontrada',
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
  getMeta,
};