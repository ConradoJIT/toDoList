require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/todoDB';
const saltRounds = 10; //o número de vezes que o algoritmo de criptografia será aplicado sobre a senha

/*
Estou usando o "cors" como middleware para permitir que o tráfego de
informações de uma porta X para uma porta Y, ou seja, do frontend que
roda em X para o back que roda em Y. As informações que chegam em Y
são salvas no banco de dados. 
*/

app.use(cors());
app.use(express.json());

//mongoose.connect(DB_URI);//, {useNewURLParser:true,useUnifiedTopology:true});
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const connection = mongoose.connection;

//A conexão com o banco de dados foi estabelecida com sucesso
connection.once('open', () => {
    console.log("Conexão estabelecida com o banco de dados");
});

//"Tabela" do usuário
const Usuarios = mongoose.model('Usuarios', {
    nome: String,
    email: String,
    senha: String
});

//"Tabela" da tarefa
const Tarefas = mongoose.model('Tarefas',{
    title: String,
    description: String,
    deadline: Date,
    //priority: Number,
    isCompleted: Boolean
    //Chave estrangeira
    //email_usuario: {
    //    type: mongoose.Schema.Types.ObjectId,
    //    ref: 'Usuarios'
    //}    
});

//CRUD usuário (só vai funcionar quando o login tiver implementado)
/*
app.get('/Usuarios/', async(req,res) =>
{
    const usuarios = await Usuarios.find();
    res.json(usuarios);
});

app.post('/Usuarios/', async(req,res)=>
{
    const novoUsuario = new Usuarios({
        nome: req.body.name,
        email: req.body.email,
        senha: await bcrypt.hash(req.body.senha,saltRounds) //criptografa a senha
    });
    await novoUsuario.save();
    res.json(novoUsuario);
});

app.put('/Usuarios/:id', async(req,res)=>
{
    try
    {
        const usuario = await Usuarios.findById(req.params.id);
        if (req.params.email !== undefined && req.params.email != ''){
            usuario.email = req.body.email;
        }
        if (req.params.nome !== undefined && req.params.nome != ''){
            usuario.nome = req.body.nome;
        }
        if (req.params.senha !== undefined && req.params.nome != ''){
            usuario.senha = req.body.senha;
        }
        await usuario.save();
        res.json(usuario);
    }
    catch (error)
    {
        res.status(500).json({error: 'Falha ao atualizar'});
    }
});

app.delete('/Usuarios/:id', async(req,res) => {
    const deleted = await Usuarios.findByIdAndDelete(req.params.id);
    if (!deleted)
        return res.status(404).json({error:'Usuário não encontrado'});
    res.json({message: 'Usuário deletado com sucesso'});
});
*/
//CRUD tarefas

app.get('/Tarefas', async (req, res) => {
    const tarefas = await Tarefas.find();
    res.json(tarefas)
});

app.post('/Tarefas', async (req,res)=>{
    const novaTarefa = new Tarefas({
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        //email_usuario: req.body.email_usuario,
        //priority: req.body.priority,
        isCompleted: req.body.isCompleted
    });
    await novaTarefa.save();
    res.json(novaTarefa);
});

app.put('/Tarefas/:id', async (req,res)=>{
    const tarefa = await Tarefas.findById(req.params.id);
    if (!tarefa)
        return res.status(404).json({error: 'Tarefa não encontrada'});
    try
    {
        if (req.body.title !== undefined && req.body.title !== ''){
            tarefa.title = req.body.title;
        }
        if (req.body.description !== undefined && req.body.description !== ''){
            tarefa.description = req.body.description;
        }
        if (req.body.deadline !== undefined){
            tarefa.deadline = req.body.deadline;
        }
        //if (req.body.prioriedade){
        //    tarefa.priority = req.body.priority;
        //}
        if (req.params.isCompleted !== undefined)
        {
            tarefa.isCompleted = req.body.isCompleted;        
        }
        await usuario.save();
        res.json(usuario);
    }
    catch(error)
    {
        res.status(500).json({error: 'Falha ao atualizar a tarefa'});
    }
});

app.delete('/Tarefas/:id', async (req,res)=>{
    const deleted = await Tarefas.findByIdAndDelete(req.params.id);
    if (!deleted)
        return res.status(404).json({error: 'Esta tarefa não existe'});
    res.json({message: 'Tarefa deletada com sucesso'});
});

//inicialização do servidor
app.listen(port, ()=> {
    console.log(`O servidor está funcionando na porta ${port}`);
});
