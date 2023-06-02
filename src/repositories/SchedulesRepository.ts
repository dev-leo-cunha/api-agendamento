import { endOfDay, startOfDay } from "date-fns";
import { prisma } from "../database/prisma";
import { ICreate } from "../interfaces/SchedulesInterface";

export const create = async ({ name, phone, date, user_id }: ICreate) => {
  const result = await prisma.schedule.create({
    data: {
      name,
      phone,
      date,
      user_id,
    },
  });
  return result;
};

export const find = async (date: Date, user_id: string) => {
  const result = await prisma.schedule.findFirst({
    where: { date, user_id },
  });
  return result;
};

export const findAll = async (date: Date) => {
  const result = await prisma.schedule.findMany({
    where: {
      date: {
        gte: startOfDay(date),
        lt: endOfDay(date),
      },
    },
    orderBy: {
      date: "asc",
    },
  });
  return result;
};

export const update = async (id: string, date: Date) => {
  const result = await prisma.schedule.update({
    where: { id },
    data: { date },
  });
  return result;
};
