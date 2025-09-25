const express = require('express');
const router = express.Router();


let alunos = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@example.com",
    cpf: "123.456.789-00",
    telefone: "99999-9999",
    dataNascimento: "2000-01-01"
  },
  {
    id: 2,
    nome: "Maria Oliveira",
    email: "maria@example.com",
    cpf: "987.654.321-00",
    telefone: "98888-8888",
    dataNascimento: "1999-05-10"
  }
];

// gerar ID
const generateId = () => alunos.length ? Math.max(...alunos.map(a => a.id)) + 1 : 1;


router.get('/', (req, res) => {
  res.json(alunos);
});


router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const aluno = alunos.find(a => a.id === id);
  if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });
  res.json(aluno);
});


router.post('/', (req, res) => {
  const { nome, email, cpf, telefone, dataNascimento } = req.body;

  if (!nome || !email || !cpf || !telefone || !dataNascimento) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  
  const exists = alunos.some(a => a.cpf === cpf || a.email === email);
  if (exists) return res.status(400).json({ error: "CPF ou email já cadastrado" });

  const novoAluno = {
    id: generateId(),
    nome,
    email,
    cpf,
    telefone,
    dataNascimento
  };

  alunos.push(novoAluno);
  res.status(201).json(novoAluno);
});


router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email, cpf, telefone, dataNascimento } = req.body;
  const index = alunos.findIndex(a => a.id === id);

  if (index === -1) return res.status(404).json({ error: "Aluno não encontrado" });

  if (!nome || !email || !cpf || !telefone || !dataNascimento) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  // duplicatas excluindo o próprio registro

  const exists = alunos.some(a => (a.cpf === cpf || a.email === email) && a.id !== id);
  if (exists) return res.status(400).json({ error: "CPF ou email já cadastrado" });

  alunos[index] = { id, nome, email, cpf, telefone, dataNascimento };
  res.json(alunos[index]);
});

// deletar
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = alunos.findIndex(a => a.id === id);
  if (index === -1) return res.status(404).json({ error: "Aluno não encontrado" });
  alunos.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
