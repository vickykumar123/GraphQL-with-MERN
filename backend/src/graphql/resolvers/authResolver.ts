import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../model/user";
import {UserType} from "../../types";

export const authResolver = {
  createUser: async (args: {userInput: UserType}) => {
    const hashPassword = await bcrypt.hash(args.userInput.password!, 12);
    const data = {
      email: args.userInput.email,
      password: hashPassword,
    };

    const user = await User.create(data);
    user.password = undefined;
    return user;
  },
  login: async ({email, password}: {email: string; password: string}) => {
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

    return {userId: user._id, token, tokenExpiration: 1};
  },
};
