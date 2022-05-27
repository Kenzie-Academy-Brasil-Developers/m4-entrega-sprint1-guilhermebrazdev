import { v4 } from "uuid";
import { hash, compareSync } from "bcrypt";
import dotenv from "dotenv";
import { sign } from "jsonwebtoken";

import { userWOPassword } from "../utils";
import USERS_DB from "../database";

dotenv.config();

const createUserService = async ({ body }) => {
  const pwd = await hash(body.password, 10);

  const insertUser = {
    name: body.name,
    email: body.email,
    isAdm: body.isAdm,
    uuid: v4(),
    password: pwd,
    createdOn: new Date(),
    updatedOn: new Date(),
  };

  USERS_DB.push(insertUser);

  const newUser = userWOPassword(insertUser);

  return newUser;
};

const loginService = ({ body }) => {
  const foundUser = USERS_DB.find((user) => user.email === body.email);

  if (!foundUser) {
    return { status: 400, message: { message: "Invalid credentials" } };
  }

  const passwordMatch = compareSync(body.password, foundUser.password);

  if (!passwordMatch) {
    return { status: 400, message: { message: "Invalid credentials" } };
  }

  const token = sign({ id: foundUser.uuid }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return { status: 200, message: { token } };
};

const getUsersService = () => {
  return USERS_DB;
};

const userByIdService = (id) => {
  const user = USERS_DB.find((u) => u.uuid === id);

  return user;
};

const updateService = async (user, body) => {
  const sendedKeys = Object.keys(body);
  const wrongKeys = ["isAdm", "uuid", "createdOn"];

  // if (
  //   body.hasOwnProperty("isAdm") ||
  //   body.hasOwnProperty("uuid") ||
  //   body.hasOwnProperty("createdOn") ||
  //   body.hasOwnProperty("updatedOn")
  // ) {
  //   return { status: 418, message: { message: "Cant update this properties" } };
  // }

  for (let i = 0; i < wrongKeys.length; i++) {
    if (sendedKeys.includes(wrongKeys[i])) {
      return {
        status: 401,
        message: { message: "Can not update this propertie(s)" },
      };
    }
  }

  if (sendedKeys.includes("email")) {
    const user = USERS_DB.find(
      (element) => element.email.toLowerCase() === body.email.toLowerCase()
    );

    if (user) {
      return { status: 409, message: { message: "E-mail already registered" } };
    }
  }

  if (sendedKeys.includes("password")) {
    const pwd = await hash(body.password, 10);
    body.password = pwd;
  }

  body.updatedOn = new Date();

  Object.assign(user, body);

  return { status: 200, message: { user } };
};

const deleteUserService = (user) => {
  const userIndex = USERS_DB.indexOf(user);

  USERS_DB.splice(userIndex, 1);

  return user;
};

export {
  getUsersService,
  createUserService,
  loginService,
  userByIdService,
  updateService,
  deleteUserService,
};
