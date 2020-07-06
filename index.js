
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');

//middleware
app.use(cors());
app.use(express.json()); //req.body


var {data} = ''; 

//ROUTES//
//app.use(express.json({extended:false}));

//create

app.post("/data/:info", async (req, res) => {
  try {

    var  data = req.params;
    const name = data.name;  
    
     console.log("Recebeu dado para alterar -> "+ info);
     return res.send( info );
  
  
  } catch (err) {
    console.error(err.message);
  }
});