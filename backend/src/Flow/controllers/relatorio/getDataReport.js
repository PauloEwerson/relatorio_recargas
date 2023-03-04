const serviceFile = require('../../service/relatorio/getDataReport');

const getDataReport = async (req, res) => {
  try {
    const result = await serviceFile.getDataReport();
    if (!result.success) {
      return res.status(400).json({ error: result.message });
    }
    return res.status(200).json({ infoCol: result.infoCol, lastUpdate: result.lastUpdate });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = getDataReport;
