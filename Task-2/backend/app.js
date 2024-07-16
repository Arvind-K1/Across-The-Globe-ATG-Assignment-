import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import errorMiddleware from "./middleware/error.middleware.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(cors({
    origin: process.env.FRONTEND_URI,
    credentials: true
}))

app.use(cookieParser());

// routers imports
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import likeRoutes from "./routes/like.routes.js";

app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/likes', likeRoutes);
app.use('/users', userRoutes);

// Default catch all route
app.all('*', (_req, res) => {
    res.status(404).send('OOPS!!! 404 Page Not Found');
  });

app.use(errorMiddleware);


export default app;