const mongoose = require("mongoose");

function validarID(req, res, next) {
  const id = req.params.id;
  const valido = mongoose.Types.ObjectId.isValid(id);

  if (!valido) {
    return res.status(400).json({ err: "ID Inválido!" });
  }

  next();
}

module.exports = {
  validarID,
};
