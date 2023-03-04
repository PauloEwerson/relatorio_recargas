const serviceFile = require('../../service/operadores/updateOperator');

const updateOperator = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, registration } = req.body;
    
    const result = await serviceFile.updateOperator(id, name, registration);
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }
    return res.status(201).json({ message: result.message, infoCol: result.infoCol });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = updateOperator;


