const {Pool} = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "matheuslili",
  host: "localhost",
  port: 5432,
  database: "contacts",
  connectionLimit:10,
  multipleStatements : true,
  //connectionString : 'postgresql://$user:$password@$host:$port/$database'
});


module.exports = {pool};
