import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import blogRoutes from "./routes/notes";
 import createHttpError, {isHttpError} from "http-errors";

const app = express();

app.use(express.json());

app.use("/api/blogs", blogRoutes);

app.use((req,res,next) => {
    next(createHttpError(404,"Endpoint not found"));
})


// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unkown error";
    let statuscode = 500;
    if (isHttpError(error)) {
        statuscode = error.status;
        errorMessage = error.message;
    }
    res.status(statuscode).json({error: errorMessage});

})

export default app;