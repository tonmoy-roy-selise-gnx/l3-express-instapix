import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import userRouter from './app/modules/user/user.router';
import storageRouter from './app/modules/storage/storage.router';
import postRouter from './app/modules/post/post.router';

const app: Application = express();

// using cors
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(cookieParser());

// parse data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Router
app.use('/user', userRouter);
app.use('/storage', storageRouter);
app.use('/insta/user', postRouter);


export default app;