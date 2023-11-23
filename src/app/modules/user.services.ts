import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserInfoDB = async (userData: TUser) => {
  const result = await User.create(userData);
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const UserServices = {
  createUserInfoDB,
  getAllUsersFromDB,
};
