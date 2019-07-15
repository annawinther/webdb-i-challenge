const express = require('express');
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


function getAllAccounts(){
    return db('accounts');
}

function getAccountById(id){
    return db('accounts').where({ id });
}


server.get('/', async (req, res) => {
    res.json("success!")
})

server.get('/api/accounts', async (req, res) => {
    // pull all accounts from db
    const accounts = await getAllAccounts();
    // send accounts back to client
    res.json(accounts);
  });

server.get('/api/accounts/:id', async (req, res) => {
    const account = await getAccountById(req.params.id);
    res.json(account[0])
})


module.exports = server;