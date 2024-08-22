import express, { Request, Response } from "express";
import cors from "cors";

import path from "path";
global.uploadDir = path.join(__dirname, "uploads_files");

import { userRouter } from "./routes/userRouter";
import { partnerRouter } from "./routes/partnerRouter";
import { authRouter } from "./routes/authorizeRouter";
import { adminRouter } from "./routes/adminRouter";
import { fileRouter } from "./routes/fileRouter";

const app = express();

app.use(cors({
    origin: '*',
    methods: '*'
}));

app.options('*', cors());

app.use("/api/attendees", userRouter);
app.use("/api/partner", partnerRouter);
app.use("/api/authorize", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/files", fileRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "API`s not found",
    });
});

const PORT = 3225;


app.listen(PORT, () => {
    console.log("Server started on port: " + PORT);
});
