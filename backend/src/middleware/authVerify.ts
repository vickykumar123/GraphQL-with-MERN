import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      isAuth: boolean;
      userId: string;
    }
  }
}

export const authVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    req.isAuth = false;
    return next();
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  //   @ts-ignore
  req.userId = decodedToken.id!;
};
