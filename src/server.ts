import express, { Application, NextFunction, Request, Response } from "express";
import UserRouter from "./routes/Users.routes";
import SchedulesRouter from "./routes/Schedules.routes";
import cors from "cors";

const server: Application = express();
server.use(cors());

server.use(express.json()); // transforma tudo em json
server.use(express.urlencoded({ extended: true })); // qualquer url com espaço, retira o espaço e coloca %20;

server.use(UserRouter);
server.use(SchedulesRouter);

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
