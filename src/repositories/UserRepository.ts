import { prisma } from "../database/prisma";
import { ICreate } from "../interfaces/UsersInterfaces";

export const create = async ({ name, email, password }: ICreate) => {
  const result = await prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });
  return result;
};

export const findUserByEmail = async (email: string) => {
  const result = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  return result;
};
export const findUserById = async (id: string) => {
  const result = await prisma.users.findUnique({
    where: {
      id,
    },
  });
  return result;
};

export const update = async (
  name: string,
  avatar_url: string,
  user_id: string
) => {
  const result = await prisma.users.update({
    where: {
      id: user_id,
    },
    data: {
      name,
      avatar_url,
    },
  });
  return result;
};

export const updatePassword = async (newPassword: string, user_id: string) => {
  const result = await prisma.users.update({
    where: {
      id: user_id,
    },
    data: {
      password: newPassword,
    },
  });
  return result;
};
