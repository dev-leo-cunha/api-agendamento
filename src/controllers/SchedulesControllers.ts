import { NextFunction, Request, Response } from "express";
import * as schedulesServices from "../services/SchedulesServices";
import { parseISO } from "date-fns";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, phone, date } = req.body;
  const { user_id } = req;
  try {
    const result = await schedulesServices.create({
      name,
      phone,
      date,
      user_id,
    });

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { date } = req.query;
  const parsedDate = date ? parseISO(date.toString()) : new Date();
  try {
    const result = await schedulesServices.index(parsedDate);
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
  const { date } = req.body;
  const { id } = req.params;
  const { user_id } = req;
  try {
    const result = await schedulesServices.update(id, date, user_id);
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

export const del = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
