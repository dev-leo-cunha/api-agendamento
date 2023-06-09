import { NextFunction, Request, Response } from "express";
import * as UserServices from "../services/UserServices";

export const ping = async (req: Request, res: Response, next: NextFunction) => {
  res.json({ ping: true });
};

export const index = (req: Request, res: Response, next: NextFunction) => {
  //buscar todos
};

export const show = (req: Request, res: Response, next: NextFunction) => {
  //buscar somente 1
};

export const store = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    const result = await UserServices.userCreate(name, email, password);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const result = await UserServices.UserAuth(email, password);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};
export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const { refresh_token } = req.body;
  try {
    const result = await UserServices.UserRefresh(refresh_token);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, oldPassword, newPassword } = req.body;
  const { user_id } = req;

  try {
    const result = await UserServices.userUpdate({
      name,
      oldPassword,
      newPassword,
      avatar_url: req.file,
      user_id
    });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
