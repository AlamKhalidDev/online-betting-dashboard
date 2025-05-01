import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import eventsRouter from "./routes/events.routes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/events", eventsRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
