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
  const token = req.cookies.token;

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
  next();
};
