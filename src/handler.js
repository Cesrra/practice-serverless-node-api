const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
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
//Intall Serverless Offline -> npm install --save-dev serverless-offline@latest
  //Run --> serverless offline

exports.handler = serverless(app);
