import { userByIdService } from "../services";

const verifyUpdater = (req, res, next) => {
  const token = req.decoded;
  const { uuid } = req.params;

  const user = userByIdService(uuid);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const updater = userByIdService(token.id);

  if (!updater) {
    return res.status(404).json({ message: "User token not found" });
  }

  if (!updater.isAdm && updater.uuid !== uuid) {
    return res.status(400).json({ message: "Missing admin permissions" });
  }

  req.user = user;

  return next();
};

export default verifyUpdater;
