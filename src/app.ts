import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user.route";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/", UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("All is Done !!!!");
});

export default app;
