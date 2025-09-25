const express = require('express');
const cors = require('cors');
const alunosRouter = require('./routes/alunos');
app.use('/alunos', alunosRouter);
const professoresRouter = require('./routes/professores');
app.use('/professores', professoresRouter);



const app = express();

app.use(cors());
app.use(express.json());

// TODO: Importar e usar routers de alunos e professores

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
