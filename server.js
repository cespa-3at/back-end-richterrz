const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

// Configura o servidor para entender os dados vindos do formulário (POST)
app.use(express.urlencoded({ extended: true }));

// Conecta ao banco de dados (certifique-se de que o nome do arquivo .db está correto)
const db = new sqlite3.Database('./matha.db');

// ROTA PRINCIPAL: Abre o formulário (index.html) quando você acessa o site
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'index.html'));
});

// ROTA DE SALVAMENTO: Recebe os dados e grava no SQLite
app.post('/salvar', (req, res) => {
 const { nome, telefone, email } = req.body;
 const sql = `INSERT INTO contatos (nome, telefone, email) VALUES (?, ?, ?)`;

 db.run(sql, [nome, telefone, email], function(err) {
     if (err) {
         return res.send("<h1>Erro ao salvar!</h1><p>" + err.message + "</p><a href='/'>Voltar</a>");
     }
     res.send("<h1>Sucesso!</h1><p>Contato salvo no banco.</p><a href='/'>Voltar e cadastrar outro</a>");
 });
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
 console.log("------------------------------------------");
 console.log("Servidor rodando em http://localhost:3000");
 console.log("Pressione Ctrl + C para parar o servidor");
 console.log("------------------------------------------");
});