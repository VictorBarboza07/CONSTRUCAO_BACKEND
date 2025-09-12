const express = require('express');
const app = express();
const port = 3000;

// Importando o router da calculadora
const calculadoraRouter = require('./routes/calculadora');
app.use('/calculadora', calculadoraRouter);

// Rota inicial
app.get('/', (req, res) => {
  res.send('API Calculadora Funcionando!');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
