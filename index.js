const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

//middleware
app.use(cors());
app.use(express.json()); //req.body

var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://postgres:matheuslili@localhost:5432/contacts')
var {contacts} = ''; 

//ROUTES//

//create

app.post("/contacts/:name-:address", getContacts = async (req, res) => {
  try {

    var contacts = req.params;
    const name = contacts.name;
    const address = contacts.address;
    
     console.log(name);
     console.log(address);     
    
await db.multi('INSERT INTO contacts (name,address) VALUES ($1,$2) RETURNING *',
     [name,address], 'array')
       .then(function (data) {
         console.log('DATA:', data)
         contacts = data;
       })
       .catch(function (error) {
         console.log('ERROR:', error)
       })
           
    console.log(JSON.stringify(contacts));
    //res.status(201).json({status:'success', message: 'Contato Adicionado'});
    //res.status(201).json(contacts);
    return res.send( JSON.stringify( contacts ));
  
  } catch (err) {
    console.error(err.message);
  }
});


//get all todos

app.get("/contacts", async (req, res) => {

  await db.any("SELECT * FROM contacts", 'array')
        .then(function (data) {
            console.log('DATA:', data);
            contacts = data;
    })
    .catch(function (error) {
      console.log('ERROR:', error);
    })
     
    console.log(JSON.stringify(contacts));
    res.json(JSON.stringify(contacts));

});


//get

app.get("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  await db.any("SELECT * FROM contacts WHERE contact_id = $1", 
          [id])
        .then(function (data) {
            console.log('DATA:', data);
            contacts = data;
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    })
     
    console.log(JSON.stringify(contacts));
    res.json(JSON.stringify(contacts));

});

//update contacts

app.put("/contacts/:id/:name-:address", async (req, res) => {

  const { id } = req.params;
  const {name} = req.params;
  const {address} = req.params;
  
  await db.any("UPDATE contacts SET name = $1, address = $2 WHERE contact_id = $3", 
          [name,address,id])
        .then(function (data) {
            console.log('DATA:', data);
            contacts = data;
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    })
     
    return res.json("Contato Atualizado!");
});

//delete a todo

app.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  await db.any("DELETE FROM contacts WHERE contact_id = $1", 
          [id])
        .then(function (data) {
            console.log('DATA:', data);
            contacts = data;
    })
    .catch(function (error) {
      console.log('ERROR:', error)
    })

    return res.json("Contato Removido!");

});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
