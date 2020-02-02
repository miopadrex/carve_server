import dotenv from "dotenv";
dotenv.config();
import { Options } from "graphql-yoga";
import app from "./app";
const PORT: number = 4000;
const PLAYGROUND_POINT: string = "/playground";
const END_POINT: string = "/graphql";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_POINT,
  endpoint: END_POINT
};

const handleAppstart = (): void => console.log(`${PORT}에서 실행중입니다.`);

app.start(appOptions, handleAppstart);
