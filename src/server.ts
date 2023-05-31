import express, { Application, NextFunction, Request, Response } from "express";
import router from "./routes/users.routes";

const server: Application = express();

server.use(express.json()); // transforma tudo em json
server.use(express.urlencoded({ extended: true })); // qualquer url com espaço, retira o espaço e coloca %20;

server.use(router);

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    message: "Erro interno do server.",
  });
});
server.listen(3000, () => console.log("Server Rodando."));
