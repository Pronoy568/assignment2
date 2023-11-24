import { TOrders, TUser } from "./user.interface";
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

const updateUserFromDB = async (
  userId: number,
  updatedField: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedValue: any
) => {
  if (await User.isUserExists(userId)) {
    const updateObject = { $set: { [updatedField]: updatedValue } };
    const result = await User.findOneAndUpdate({ userId }, updateObject, {
      new: true,
      runValidators: true,
    });
    return result;
  } else {
    throw new Error("User not found");
  }
};

const addProductFromDB = async (userId: number, orderData: TOrders[]) => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne(
      { userId: userId },
      { $addToSet: { orders: orderData } }
    );
    return result;
  } else {
    throw new Error("User not found");
  }
};

const getProductFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const OrderFind = await User.findOne({ userId });
    const OrderData = OrderFind?.orders;

    const result = {
      orders: OrderData?.map((order) => ({
        productName: order.productName,
        price: order.price,
        quantity: order.quantity,
      })),
    };

    return result;
  } else {
    throw new Error("User not found");
  }
};

const getTotalPriceFromDB = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const OrderFind = await User.findOne({ userId });
    const OrderData = OrderFind?.orders;

    const result = {
      orders: OrderData?.map((order) => ({
        price: order.price,
        quantity: order.quantity,
      })),
    };

    const totalPrice = result?.orders
      ? parseFloat(
          result.orders
            .reduce((total, order) => {
              return total + order.price * order.quantity;
            }, 0)
            .toFixed(2)
        )
      : "";

    return totalPrice;
  } else {
    throw new Error("User not found");
  }
};

export const UserServices = {
  createUserInfoDB,
  getAllUsersFromDB,
  getUserFromDB,
  deleteUserFromDB,
  updateUserFromDB,
  addProductFromDB,
  getProductFromDB,
  getTotalPriceFromDB,
};
