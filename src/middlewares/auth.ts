import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { IPayload } from "../interfaces/UsersInterfaces";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      code: "token.missing",
      message: "Token Faltando!",
    });
  }
  const [, token] = authHeader.split(" ");
  try {
    const secret = process.env.SECRET_KEY;
    if (!secret) {
      throw new Error("Não existe a chave do token!");
    }
    const { sub } = verify(token, secret) as IPayload;
    req.user_id = sub;
    return next();
  } catch (error) {
    return res.status(401).json({
      code: "token.expired",
      message: "Token expirado",
    });
  }
};
