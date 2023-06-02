import { compare, hash } from "bcrypt";
import * as UserRepositories from "../repositories/UserRepository";
import { IUpdate } from "../interfaces/UsersInterfaces";
import { s3 } from "../config/aws";
import { v4 as uuid } from "uuid";
import { sign, verify } from "jsonwebtoken";

export const userCreate = async (
  name: string,
  email: string,
  password: string
) => {
  const findUser = await UserRepositories.findUserByEmail(email);
  if (findUser) {
    throw new Error("Usuário já existente");
  }
  const hashPassword = await hash(password, 10);

  const create = await UserRepositories.create({
    name,
    email,
    password: hashPassword,
  });

  return create;
};

export const userUpdate = async ({
  name,
  oldPassword,
  newPassword,
  avatar_url,
  user_id,
}: IUpdate) => {
  let password;

  if (oldPassword && newPassword) {
    const findUser = await UserRepositories.findUserById(user_id);
    if (!findUser) {
      throw new Error("Usuário não encontrado");
    }
    const passwordMatch = await compare(oldPassword, findUser.password);
    if (!passwordMatch) {
      throw new Error("Senha Inválida");
    }
    password = await hash(newPassword, 10);
    await UserRepositories.updatePassword(password, user_id);
  }
  if (avatar_url) {
    const uploadImg = avatar_url?.buffer;
    const uploadS3 = await s3
      .upload({
        Bucket: "avatar-user-scheduling",
        Key: `${uuid()}-${avatar_url?.originalname}`,
        Body: uploadImg,
      })
      .promise();
    await UserRepositories.update(name, uploadS3.Location, user_id);
  }
  return {
    message: "Usuário Atualizado com sucesso",
  };
};

export const UserAuth = async (email: string, password: string) => {
  const findUser = await UserRepositories.findUserByEmail(email);
  if (!findUser) {
    throw new Error("Usuário ou senha inválida");
  }
  const passwordMatch = compare(password, findUser.password);
  if (!passwordMatch) {
    throw new Error("Usuário ou senha inválida");
  }
  if (!process.env.SECRET_KEY) {
    throw new Error("Não existe a chave do token!");
  }
  const token = sign({ email }, process.env.SECRET_KEY, {
    subject: findUser.id,
    expiresIn: 60 * 15,
  });
  const refreshToken = sign({ email }, process.env.SECRET_KEY, {
    subject: findUser.id,
    expiresIn: "7d",
  });
  return {
    token,
    refresh_token: refreshToken,
    user: {
      name: findUser.name,
      email: findUser.email,
    },
  };
};
export const UserRefresh = async (refresh_token: string) => {
  if (!refresh_token) {
    throw new Error("Refresh Token não existe");
  }
  if (!process.env.SECRET_KEY) {
    throw new Error("Não existe a chave do token!");
  }
  const verifyRefreshToken = verify(refresh_token, process.env.SECRET_KEY);
  const { sub } = verifyRefreshToken;

  const newToken = sign({ sub }, process.env.SECRET_KEY, {
    expiresIn: 60 * 15,
  });
  return { token: newToken };
};
