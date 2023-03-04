const serviceFile = require('../../service/operadores/addOperator');

const addOperator = async (req, res) => {
  try {
    const { name, registration } = req.body;
    const operatorExists = await serviceFile.verifyIfOperatorExists(registration);
    if (!operatorExists.success) {
      return res.status(400).json({ error: operatorExists.message });
    }

    const result = await serviceFile.addOperator(name, registration);
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }
    return res.status(201).json({ message: result.message, infoCol: result.infoCol });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = addOperator;
