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

function createNewAccount({ name, budget }){
    return db('accounts').insert({ name, budget })
}

function updateAccountById(id, {name, budget}){
    return db('accounts').where({ id }).update({ name, budget })
}
server.get('/', async (req, res) => {
    res.json("success!")
})

server.get('/accounts', async (req, res) => {
    // pull all accounts from db
    const accounts = await getAllAccounts();
    // send accounts back to client
    res.json(accounts);
  });

server.get('/accounts/:id', async (req, res) => {
    const account = await getAccountById(req.params.id);
    res.json(account[0])
})

server.post('/accounts', async (req,res, next) => {
    try {
        const newAccountId = await createNewAccount(req.body);
        const arrayOfUsers = await getAccountById(newAccountId[0]);
        res.status(201).json(arrayOfUsers);
      } catch (error) {
        next(new Error("Couldn't create user :("));
      }
})

server.put('/accounts/:id', async (req, res) => {
    try {
        const { name, budget } = req.body;
        const updatedAccountId = await updateAccountById(req.params.id, { name, budget });
        const arrayUpdated = await getAccountById(updatedAccountId)
        res.status(200).json(arrayUpdated);
    } catch (error) {
        res.status(500).json({message: "could not update account"})
    }
})

module.exports = server;