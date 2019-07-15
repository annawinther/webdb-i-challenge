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

function deleteById(id){
    return db('accounts').where({ id }).del();
}
server.get('/', async (req, res) => {
    res.json("success!")
})

server.get('/accounts', async (req, res) => {
    // pull all accounts from db
    try{ 
        const accounts = await getAllAccounts();
        // send accounts back to client
        res.status(200).json(accounts);
    }catch (error){ 
        res.status(500).json({ message: "could not get all accounts"  })
    }
   
  });

server.get('/accounts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const account = await getAccountById(id);
        if (account[0]){
            res.status(200).json(account[0])
        } else {
            res.status(404).json({ message: "the account with this id is not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "could not get the account with that id" })
    }
})

server.post('/accounts', async (req, res, next) => {
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
        // const arrayUpdated = await getAccountById(updatedAccountId)
        res.status(200).json(updatedAccountId);
    } catch (error) {
        res.status(500).json({message: "could not update account" })
    }
})

server.delete('/accounts/:id', async (req, res) => {
    try {
        const deltedAccount = await deleteById(req.params.id);
        res.status(200).json({ message: `${deltedAccount} account has been deleted` })
    } catch (error) {
        res.status(200).json({ error: "could not delete account" })
    }
})


module.exports = server;