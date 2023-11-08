import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import cors from "cors";
import { server } from "./index";

const startServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());

  await server.start();
  app.use("/graphql", expressMiddleware(server));

  app.listen(8001, () => console.log("Server started at PORT 8001"));
};

startServer();
