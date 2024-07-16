import cookieParser from "cookie-parser";
import express from "express";
import errorMiddleware from "./middleware/error.middleware";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true
}))

app.use(cookieParser());

//

// Default catch all route
app.all('*', (_req, res) => {
    res.status(404).send('OOPS!!! 404 Page Not Found');
  });

app.use(errorMiddleware);


export default app;