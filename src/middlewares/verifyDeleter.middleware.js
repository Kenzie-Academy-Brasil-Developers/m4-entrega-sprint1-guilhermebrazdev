import { userByIdService } from "../services";

const verifyDeleter = (req, res, next) => {
  const token = req.decoded;
  const { uuid } = req.params;

  const user = userByIdService(uuid);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const deleter = userByIdService(token.id);

  if (!deleter) {
    return res.status(404).json({ message: "User token not found" });
  }

  if (deleter.uuid !== uuid && !deleter.isAdm) {
    return res.status(400).json({ message: "Missing admin permissions" });
  }

  return next();
};

export default verifyDeleter;
