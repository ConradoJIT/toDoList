const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');

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

mongoose.connect('mongodb://localhost:27017/todoDB', {
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

app.post('/Usuarios/registro', async(req,res)=>
{
    const {nome,email,_} = await Usuarios.findOne({email});
    if (email)
        return res.status(401).json({message:'Usuário já existe encontrado.'});
    if (nome)
        return res.status(401).json({message:'Nickname já existe.'});
    const novoUsuario = new Usuarios({
        nome: req.body.name,
        email: req.body.email,
        senha: await bcrypt.hash(req.body.senha,saltRounds) //criptografa a senha
    });
    await novoUsuario.save();
    res.json(novoUsuario);
});


app.post('/Usuarios/logging', async(req,res) =>
{
    const {email, senha} = req.body;
    const usuario = await Usuarios.findOne({email});
    
    if (!usuario)
        return res.status(401).json({message:'Usuário não encontrado'});
    
    const isPwdCorrect = await bcrypt.compare(senha, usuario.senha);
    if (!isPwdCorrect)
        return res.status(401).json({message:'Senha inválida'});
    
    const token = jwt.sign
    (
        {
            _id: user._id, //talvez seja necessário mudar esse "_id" para "id" para não dar conflito no front
            nome: user.nome,
            email: user.email
        },
        secretNumber,
        {expiresIn:'12h'}
    );
    res.json({token});
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
        if (req.body.isCompleted !== undefined)
        {
            tarefa.isCompleted = req.body.isCompleted;        
        }
        await tarefa.save();
        res.json(tarefa);
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
