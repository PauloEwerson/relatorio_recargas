const validateSendCsv = async (req, res, next) => {
  const file = req.file;
    if (!file) {
        return res.status(400).json({ error: 'Arquivo inválido' });
    }
    
  next();
}

module.exports = { validateSendCsv };