import { Request, Response } from "express";
import { userValidationSchema } from "./user.validation";
import { UserServices } from "./user.services";
import { TOrders, TUser } from "./user.interface";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const parsedData = userValidationSchema.parse(userData);
    const result = await UserServices.createUserInfoDB(parsedData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      date: result,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: err || "Something went wrong !!!",
      error: err,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong !!!",
      error: err,
    });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong !!!",
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.deleteUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result.deletedCount === 1 ? null : "",
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong !!!",
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedValue: TUser = req.body;

    if (
      !updatedValue ||
      !updatedValue.userId ||
      !updatedValue.username ||
      !updatedValue.fullName.firstName ||
      !updatedValue.fullName.lastName ||
      !updatedValue.age ||
      !updatedValue.email ||
      !updatedValue.isActive ||
      !updatedValue.hobbies ||
      !updatedValue.address.city ||
      !updatedValue.address.country ||
      !updatedValue.address.street
    ) {
      throw new Error("Invalid data !!!");
    } else {
      const result = await UserServices.updateUserFromDB(
        Number(userId),
        updatedValue
      );

      res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data: result,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong !!!",
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { orders } = req.body;

    if (
      Array.isArray(orders) &&
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      orders.every((order: any): order is TOrders => {
        return (
          typeof order === "object" &&
          order !== null &&
          "productName" in order &&
          "price" in order &&
          "quantity" in order &&
          typeof order.productName === "string" &&
          typeof order.price === "number" &&
          typeof order.quantity === "number"
        );
      })
    ) {
      // Use orders as TOrders[]
      const typedOrders: TOrders[] = orders;

      // Use typedOrders in your business logic (replace with your actual logic)
      const result = await UserServices.addProductFromDB(
        Number(userId),
        typedOrders
      );

      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result.upsertedId,
      });
    } else {
      // Handle the case where orders doesn't have the expected structure
      res.status(400).json({
        success: false,
        message: "Invalid orders format in the request body.",
        error: {
          code: 404,
          description: "Invalid orders type!",
        },
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong !!!",
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const getProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getProductFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong !!!",
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserServices.getTotalPriceFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice: result,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong !!!",
      error: {
        code: 404,
        description: err.message,
      },
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  addProduct,
  getProduct,
  getTotalPrice,
};
