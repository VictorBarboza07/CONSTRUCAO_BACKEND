const express = require('express');
const router = express.Router();

// ENDPOINT: SOMAR
router.get('/somar', (req, res) => {
  const numA = Number(req.query.numA);
  const numB = Number(req.query.numB);
  const resultado = numA + numB;
  res.json({ resultado });
});

// ENDPOINT: SUBTRAIR
router.get('/subtrair', (req, res) => {
  const numA = Number(req.query.numA);
  const numB = Number(req.query.numB);
  const resultado = numA - numB;
  res.json({ resultado });
});

// ENDPOINT: MULTIPLICAR
router.get('/multiplicar', (req, res) => {
  const numA = Number(req.query.numA);
  const numB = Number(req.query.numB);
  const resultado = numA * numB;
  res.json({ resultado });
});

// ENDPOINT: DIVIDIR
router.get('/dividir', (req, res) => {
  const numA = Number(req.query.numA);
  const numB = Number(req.query.numB);
  if (numB === 0) {
    return res.status(400).json({ erro: "Não é possível dividir por zero" });
  }
  const resultado = numA / numB;
  res.json({ resultado });
});

// ENDPOINT: AO QUADRADO
router.get('/aoQuadrado', (req, res) => {
  const numA = Number(req.query.numA);
  const resultado = numA ** 2;
  res.json({ resultado });
});

// ENDPOINT: RAIZ QUADRADA
router.get('/raizQuadrada', (req, res) => {
  const numA = Number(req.query.numA);
  if (numA < 0) {
    return res.status(400).json({ erro: "Não é possível calcular raiz de número negativo" });
  }
  const resultado = Math.sqrt(numA);
  res.json({ resultado });
});

module.exports = router;
