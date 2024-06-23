import express, { Request, Response } from "express";
import cors from "cors";

import path from "path";
global.uploadDir = path.join(__dirname, "uploads_files");

import { userRouter } from "./routes/userRouter";
import { qrRouter } from "./routes/qrRouter";

const app = express();

app.use(cors({
    origin: '*',
    methods: '*'
}));

app.options('*', cors());

app.use("/api/reg", userRouter);
app.use("/api/qr", qrRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "API`s not found",
    });
});

const PORT = 3225;

app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});
