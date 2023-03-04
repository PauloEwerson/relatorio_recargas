const serviceFile = require('../../service/operadores/getAllOperators');

const getAllOperators = async (req, res) => {
  try {
    const result = await serviceFile.getAllOperators();
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }
    return res.status(200).json({ infoCol: result.infoCol });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getAllOperators;