import Express from "express";
import type { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./_middleware/error-handler";
import userController from "./users/users.controller";

const app = Express();
dotenv.config();

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userController);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
