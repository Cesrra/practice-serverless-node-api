const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { neon, neonConfig } = require('@neondatabase/serverless')

const dbClient = async () => {
  neonConfig.fetchConnectionCache = true
  const sql = neon(process.env.DATABASE_URL)
  return sql
}

app.get("/", async (req, res, next) => {
  const sql = await dbClient()
  const [results] = await sql`select now()`
  return res.status(200).json({
    message: "Hello from root! ",
    results: results.now
  });
});

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

//Server full app
// app.listen(3000, () => {
//   console.log('Server - Listening on port 3000')
// })
/*
Intall Serverless Offline -> npm install --save-dev serverless-offline@latest
  Run --> serverless offline
.ENV plugin
  install -> npm install --save-dev serverless-dotenv-plugin@latest
neonctl -> is used to conect with serverless database neon
neonctl auth -> to give the permisions on the neon project
neonctl connection-string -> give the conection string of the database
  sudo apt install postgresql-client
  psql 'postgresql://neondb_owner:26MUwSGcCfpA@ep-winter-art-a5fzhjak.us-east-2.aws.neon.tech/neondb?sslmode=require'
neonctl branches list
neonctl branches create --name name_branche
neonctl connection-string --branch dev
*/

exports.handler = serverless(app);
