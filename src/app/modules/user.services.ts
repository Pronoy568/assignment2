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

const getUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId });
    return result;
  } else {
    throw new Error("User not found");
  }
};

const deleteUserFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId });
    return result;
  } else {
    throw new Error("User not found");
  }
};

export const UserServices = {
  createUserInfoDB,
  getAllUsersFromDB,
  getUserFromDB,
  deleteUserFromDB,
};
