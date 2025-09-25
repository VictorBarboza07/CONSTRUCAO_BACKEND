const express = require('express');
const router = express.Router();

let professores = [
  {
    id: 1,
    nome: "Carlos Santos",
    email: "carlos@example.com",
    cpf: "111.222.333-44",
    curso: "Engenharia",
    disciplina: "Matemática"
  },
  {
    id: 2,
    nome: "Ana Paula",
    email: "ana@example.com",
    cpf: "555.666.777-88",
    curso: "Letras",
    disciplina: "Português"
  }
];

const generateId = () => professores.length ? Math.max(...professores.map(p => p.id)) + 1 : 1;

router.get('/', (req, res) => {
  res.json(professores);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const prof = professores.find(p => p.id === id);
  if (!prof) return res.status(404).json({ error: "Professor não encontrado" });
  res.json(prof);
});

router.post('/', (req, res) => {
  const { nome, email, cpf, curso, disciplina } = req.body;
  if (!nome || !email || !cpf || !curso || !disciplina) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const exists = professores.some(p => p.cpf === cpf || p.email === email);
  if (exists) return res.status(400).json({ error: "CPF ou email já cadastrado" });

  const novoProf = {
    id: generateId(),
    nome,
    email,
    cpf,
    curso,
    disciplina
  };

  professores.push(novoProf);
  res.status(201).json(novoProf);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, email, cpf, curso, disciplina } = req.body;
  const index = professores.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ error: "Professor não encontrado" });

  if (!nome || !email || !cpf || !curso || !disciplina) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const exists = professores.some(p => (p.cpf === cpf || p.email === email) && p.id !== id);
  if (exists) return res.status(400).json({ error: "CPF ou email já cadastrado" });

  professores[index] = { id, nome, email, cpf, curso, disciplina };
  res.json(professores[index]);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = professores.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Professor não encontrado" });
  professores.splice(index, 1);
  res.status(204).send();
});

module.exports = router;
