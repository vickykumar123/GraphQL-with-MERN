import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../model/user";
import {UserType} from "../../types";
import {Request, Response} from "express";

export const authResolver = {
  createUser: async (
    args: {userInput: UserType},
    context: {req: Request; res: Response}
  ) => {
    const hashPassword = await bcrypt.hash(args.userInput.password!, 12);
    const data = {
      email: args.userInput.email,
      password: hashPassword,
    };

    const user = await User.create(data);
    user.password = undefined;
    const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
    context.res.cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE!),
      httpOnly: true,
      maxAge: 10 * 86400000, //10 day in ms
    });
    return user;
  },
  login: async (
    {email, password}: {email: string; password: string},
    context: {req: Request; res: Response}
  ) => {
    const user = await User.findOne({email});
    if (!user) {
      throw new Error("User does not exist");
    }
    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) {
      throw new Error("Email or Password doesn't match");
    }
    const token = jwt.sign({id: user?._id}, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    context.res.cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE!),
      httpOnly: true,
      maxAge: 10 * 86400000, //10 day in ms
    });
    return {userId: user._id, token, tokenExpiration: 1, email: user.email};
  },
};
