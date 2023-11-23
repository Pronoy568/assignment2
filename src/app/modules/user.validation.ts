import { z } from "zod";

const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First Name is required" })
    .max(15, { message: "First Name can not be more than 15 character" }),
  lastName: z
    .string()
    .min(1, { message: "Last Name is required" })
    .max(15, { message: "Last Name can not be more than 15 character" }),
});

const addressValidationSchema = z.object({
  street: z.string().min(1, { message: "Street is required" }),
  city: z.string().min(1, { message: "City is required" }),
  country: z.string().min(1, { message: "Country is required" }),
});

const ordersValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const userValidationSchema = z.object({
  userId: z.number().min(1, { message: "userId is required" }),
  username: z.string().min(1, { message: "username is required" }),
  password: z
    .string()
    .min(1, { message: "password is required" })
    .max(12, { message: "Password can not be more than 12 character" }),
  fullName: fullNameValidationSchema,
  age: z.number().min(1, { message: "Age is required" }),
  email: z.string().email().min(1, { message: "Email is required" }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressValidationSchema,
  orders: ordersValidationSchema.optional(),
});
