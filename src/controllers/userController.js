import res from "express/lib/response";
import USERS_DB from "../database";

import {
  createUserService,
  getUsersService,
  loginService,
  userByIdService,
  updateService,
  deleteUserService,
} from "../services";

const createUser = async (req, res) => {
  const newUser = await createUserService(req);

  return res.status(201).json(newUser);
};

const login = (req, res) => {
  const { status, message } = loginService(req);

  return res.status(status).json(message);
};

const getUsers = (_, res) => {
  const users = getUsersService();

  return res.status(200).json(users);
};

const getUserData = (req, res) => {
  const tokenInfo = req.decoded;

  const user = userByIdService(tokenInfo.id);

  if (!user) {
    return res.status(404).json({ message: "User token not found" });
  }

  return res.status(200).json({ user });
};

const updateUser = (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { status, message } = updateService(user, body);

  return res.status(status).json(message);
};

const deleteUser = (req, res) => {
  const user = req.user;

  const deletedUser = deleteUserService(user);

  return res.status(200).json({ message: "User deleted with success" });
};

export { getUsers, createUser, login, getUserData, updateUser, deleteUser };
