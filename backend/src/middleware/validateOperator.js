const validateOperator = async (req, res, next) => {
  const { name, registration } = req.body;

  if (!name) {
    return { success: false, error: 'Informe um nome' };
  } else if (!registration) {
    return { success: false, error: 'Informe uma matrícula' };
  }

  next();
}

module.exports = { validateOperator };