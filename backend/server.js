const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const req = require("express/lib/request.js");

const app = express();
const port = 5000;
const saltRounds = 10; //o número de vezes que o algoritmo de criptografia será aplicado sobre a senha

/*
Estou usando o "cors" como middleware para permitir que o tráfego de
informações de uma porta X para uma porta Y, ou seja, do frontend que
roda em X para o back que roda em Y. As informações que chegam em Y
são salvas no banco de dados. 
*/

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

//A conexão com o banco de dados foi estabelecida com sucesso
connection.once("open", () => {
  console.log("Conexão estabelecida com o banco de dados");
});

//"Tabela" do usuário
const Usuarios = mongoose.model("Usuarios", {
  nome: String,
  email: String,
  senha: String,
});

//"Tabela" da tarefa
const Tarefas = mongoose.model("Tarefas", {
  title: String,
  description: String,
  deadline: Date,
  //priority: Number,
  isCompleted: Boolean,
  //Chave estrangeira
  id_usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuarios",
  },
});

//CRUD usuário (só vai funcionar quando o login tiver implementado)

app.get("/Usuarios/", async (req, res) => {
  const usuarios = await Usuarios.find();
  res.json(usuarios);
});

app.post("/Usuarios/registro", async (req, res) => {
  const usuarioExistente = await Usuarios.findOne({ email: req.body.email });

  if (usuarioExistente) {
    return res.status(401).json({ message: "Usuário já existe encontrado." });
  }

  const novoUsuario = new Usuarios({
    nome: req.body.name,
    email: req.body.email,
    senha: await bcrypt.hash(req.body.senha, saltRounds),
  });

  await novoUsuario.save();
  res.json(novoUsuario);
});

const secretNumber =
  "f97f28619e5cfdd7432c7a09ad43adebd025d0d34bd285169a791509cdfa77db5af46c485c3afc5ad1489fac87c9da8228e2801d537a9d65cb6705a323acdcc0";

app.post("/Usuarios/logging", async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuarios.findOne({ email });

  if (!usuario)
    return res.status(401).json({ message: "Usuário não encontrado" });

  const isPwdCorrect = await bcrypt.compare(senha, usuario.senha);
  if (!isPwdCorrect) return res.status(401).json({ message: "Senha inválida" });

  const token = jwt.sign(
    {
      _id: usuario._id, //talvez seja necessário mudar esse "_id" para "id" para não dar conflito no front
      nome: usuario.nome,
      email: usuario.email,
    },
    secretNumber,
    { expiresIn: "12h" }
  );
  res.json({ token });
});

app.put("/Usuarios/:id", async (req, res) => {
  try {
    const usuario = await Usuarios.findById(req.params.id);
    if (!usuario)
      return res.status(404).json({ message: "O usuário não existe" });

    const { nome, email, senha } = req.body;

    if (email !== undefined && email != "") {
      usuario.email = email;
    }
    if (nome !== undefined && nome != "") {
      usuario.nome = nome;
    }
    if (senha !== undefined && senha.length >= 6) {
      usuario.senha = await bcrypt.hash(senha, saltRounds);
    }
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Falha ao atualizar" });
  }
});

app.delete("/Usuarios/:id", async (req, res) => {
  const deleted = await Usuarios.findByIdAndDelete(req.params.id);
  if (!deleted)
    return res.status(404).json({ error: "Usuário não encontrado" });
  res.json({ message: "Usuário deletado com sucesso" });
});

//CRUD tarefas
app.get("/Tarefas", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "O token não foi fornecido" });
  try {
    const tokenDecoded = jwt.verify(token, secretNumber);
    const tarefasUsuario = await Tarefas.find({
      id_usuario: tokenDecoded._id, // <- alterei aqui
    });
    res.json(tarefasUsuario);
  } catch (err) {
    res.status(401).json({ message: "O token é inválido" });
  }
});

app.post("/Tarefas", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "O token não foi fornecido" });
  try {
    const tokenDecoded = jwt.verify(token, secretNumber);
    const novaTarefa = new Tarefas({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      isCompleted: req.body.isCompleted,
      id_usuario: tokenDecoded._id,
    });
    await novaTarefa.save();
    res.json(novaTarefa);
  } catch (err) {
    return res.status(401).json({ message: "O token é inválido" });
  }
});

app.put("/Tarefas/:id", async (req, res) => {
  const tarefa = await Tarefas.findById(req.params.id);
  if (!tarefa) return res.status(404).json({ error: "Tarefa não encontrada" });
  try {
    if (req.body.title !== undefined && req.body.title !== "") {
      tarefa.title = req.body.title;
    }
    if (req.body.description !== undefined && req.body.description !== "") {
      tarefa.description = req.body.description;
    }
    if (req.body.deadline !== undefined) {
      tarefa.deadline = req.body.deadline;
    }
    //if (req.body.prioriedade){
    //    tarefa.priority = req.body.priority;
    //}
    if (req.body.isCompleted !== undefined) {
      tarefa.isCompleted = req.body.isCompleted;
    }
    await tarefa.save();
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: "Falha ao atualizar a tarefa" });
  }
});

app.delete("/Tarefas/:id", async (req, res) => {
  const deleted = await Tarefas.findByIdAndDelete(req.params.id);
  if (!deleted)
    return res.status(404).json({ error: "Esta tarefa não existe" });
  res.json({ message: "Tarefa deletada com sucesso" });
});

//inicialização do servidor
app.listen(port, () => {
  console.log(`O servidor está funcionando na porta ${port}`);
});
