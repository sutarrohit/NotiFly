import express, { Request, Response } from "express";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { parse } from "cookie";
import cors from "cors";
import { server } from "./index";
import helmet from "helmet";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

const startServer = async () => {
  const app = express();

  const corsOptions = {
    origin: process.env.CLIENT_DOMAIN,
    credentials: true,
  };

  // SECURE HEADER
  app.use(helmet());
  //Protect against HTTP Parameter Pollution attacks
  app.use(hpp());
  // DATA SANITIZATION AGAINST NoSQL QUERY INJECTION
  app.use(mongoSanitize());

  app.use(cors(corsOptions));
  app.use(bodyParser.json());
  app.use(cookieParser());

  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }: { req: Request; res: Response }) => {
        const cookies = parse(req.headers.cookie || "");
        const authToken = cookies.AuthToken;
        return { req, res, authToken };
      },
    }),
  );

  app.listen(8000, () => console.log("Server started at PORT 8000"));
};

startServer();
