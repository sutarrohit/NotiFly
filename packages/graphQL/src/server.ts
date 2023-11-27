import express, { Request, Response } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { server } from "./index";

const startServer = async () => {
  const app = express();

  const corsOptions = {
    origin: process.env.CLIENT_DOMAIN,
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(cookieParser());

  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }: { req: Request; res: Response }) => {
        const cookies = req.headers.cookie;
        return { req, res };
      },
    }),
  );

  app.listen(8000, () => console.log("Server started at PORT 8000"));
};

startServer();
