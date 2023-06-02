import { ICreate } from "../interfaces/SchedulesInterface";
import { isBefore, startOfHour } from "date-fns";
import * as SchedulesRepository from "../repositories/SchedulesRepository";
import moment from "moment-timezone";

export const create = async ({ name, phone, date, user_id }: ICreate) => {
  const dateObj = moment.parseZone(date).toDate();
  const hourStartMoment = moment(dateObj).utc().startOf("hour");
  const hourStart = hourStartMoment.toDate();
  const hour = hourStartMoment.hours();
  if (hour < 9 || hour > 19) {
    throw new Error("Horário de atendimento: 9h às 19h ");
  }

  if (isBefore(hourStart, new Date())) {
    throw new Error("Essa data já passou");
  }
  const checkAvailable = await SchedulesRepository.find(hourStart, user_id);
  if (checkAvailable) {
    throw new Error("Data não disponível");
  }
  const create = await SchedulesRepository.create({
    name,
    phone,
    date: hourStart,
    user_id,
  });
  return create;
};

export const index = async (date: Date) => {
  const result = await SchedulesRepository.findAll(date);
  return result;
};

export const update = async (id: string, date: Date, user_id: string) => {
  const dateObj = moment.parseZone(date).toDate();
  const hourStart = startOfHour(dateObj);

  if (isBefore(hourStart, new Date())) {
    throw new Error("Essa data já passou");
  }
  const checkAvailable = await SchedulesRepository.find(hourStart, user_id);
  if (checkAvailable) {
    throw new Error("Data não disponível");
  }
  const result = await SchedulesRepository.update(id, hourStart);
  return result;
};
