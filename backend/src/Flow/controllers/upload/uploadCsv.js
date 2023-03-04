const serviceFile = require('../../service/upload/uploadCsv');

const uploadCsv = async (req, res, next) => {
  try {
    const { file } = req;
    const filePath = file.path;
    const dataUpdate = await serviceFile.uploadCsv(filePath);

    if (dataUpdate.success === false) {
      return res.status(400).json({ error: 'Ocorreu um erro na importação' });
    }

    return res.status(200).json({
      message: 'Arquivo enviado com sucesso'
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro no servidor ao enviar o arquivo' });
  }
};

module.exports = uploadCsv;
