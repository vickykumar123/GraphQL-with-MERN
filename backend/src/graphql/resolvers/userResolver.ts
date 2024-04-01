import User from "../../model/user";

export const userResolver = {
  getUser: async (_id: string) => {
    const user = await User.findById(_id).populate("createdEvents");
    user!.password = undefined;
    return user;
  },
};
