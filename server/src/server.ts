import express from "express";

const app = express();
const port = 3333;

app.get("/", (request, response) => {
  response.json({
    message: "Hello World!",
    status: "Servidor funcionando com sucesso.",
  });
});

app.listen(port, () => {
  console.log(`servidor inicializado em http://localhost:${port}`);
});
