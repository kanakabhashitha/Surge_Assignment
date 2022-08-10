import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import connectBD from "./db/connect.js";

//routers
import authRouter from "./routes/authRoutes.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());

//routers
app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/jobs", authenticateUser, jobsRouter);

// middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

//connect db
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectBD(process.env.MONGO_URL);

    app.listen(port, () => {
      console.log(`Server Is Listening Port ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
