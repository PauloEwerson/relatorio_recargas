const serviceFile = require('../../service/analytics/getMeta');

const getMeta = async (req, res) => {
  try {
    const result = await serviceFile.getMeta();
    if (!result.success) {
      return res.status(404).json({ error: result.message });
    }
    return res.status(200).json({ message: result.message, infoCol: result.infoCol });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getMeta;
