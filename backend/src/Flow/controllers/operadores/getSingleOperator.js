const serviceFile = require('../../service/operadores/getSingleOperator');

const getSingleOperator = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await serviceFile.getSingleOperator(id);

    if (!result.success) {
      return res.status(404).json({ error: result.message });
    }
    
    return res.status(200).json({ message: result.message, infoCol: result.infoCol });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getSingleOperator;
