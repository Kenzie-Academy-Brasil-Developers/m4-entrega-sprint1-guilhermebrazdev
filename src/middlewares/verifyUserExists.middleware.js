import USERS_DB from "../database";

const verifyUser = (req, res, next) => {
  const user = USERS_DB.find(
    (element) => element.email.toLowerCase() === req.body.email.toLowerCase()
  );

  if (user) {
    return res.status(409).json({ message: "E-mail already registered" });
  }

  return next();
};

export default verifyUser;
