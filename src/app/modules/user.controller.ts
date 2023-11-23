import { Request, Response } from "express";
import { userValidationSchema } from "./user.validation";
import { UserServices } from "./user.services";

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;

    const parsedData = userValidationSchema.parse(userData);
    const result = await UserServices.createUserInfoDB(parsedData);

    res.status(200).json({
      success: true,
      message: "User is created successfully !!!",
      date: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err || "Something went wrong !!!",
      error: err,
    });
  }
};

export const UserControllers = {
  createUser,
};
