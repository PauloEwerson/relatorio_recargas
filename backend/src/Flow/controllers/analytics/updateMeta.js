const serviceFile = require('../../service/analytics/updateMeta');

const updateMeta = async (req, res) => {
  try {
    const { updateMeta: meta } = req.body;
    
    const result = await serviceFile.updateMeta(meta);
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }
    return res.status(201).json({ message: result.message });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = updateMeta;


