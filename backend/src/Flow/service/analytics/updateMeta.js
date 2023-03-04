const { Analytics } = require('../../../db/models');

const updateMeta = async (meta) => {
  try {
    const result = await Analytics.update(
      { meta },
      { where: { id: 1 } },
    );
    if (!result) {
      return {
        success: false,
        message: 'Não foi possível atualizar a meta',
      };
    }
    return {
      success: true,
      message: 'Meta atualizada',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Erro na requisição',
    };
  }
}

module.exports = {
  updateMeta,
};