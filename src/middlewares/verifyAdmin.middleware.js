import { userByIdService } from "../services";
import { decode } from "jsonwebtoken";

import { userByIdService } from "../services";

const verifyAdmin = (req, res, next) => {
  // const token = req.headers.authorization?.split(" ")[1];
  // const userId = decode(token).id;

  const tokenInfo = req.decoded;

  const userId = tokenInfo.id;

  const user = userByIdService(userId);

  if (!user) {
    return res.status(404).json({ message: "User token not found" });
  }

  if (!user.isAdm) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
};

export default verifyAdmin;
