import USERS_DB from "../database";

const getUserByIdor404 = (req, res, next) => {
  const { uuid } = req.params;

  const user = USERS_DB.find((u) => u.uuid === uuid);

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  req.user = user;

  next();
};
export default getUserByIdor404;
