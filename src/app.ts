import express from "express";
import cors from "cors";
import { dataSourceLocal, dataSourceAuroraAWS } from "./infrastructure/configuration/DataSourceSpaceGroup";
import spaceGroupRouter from "./infrastructure/router/SpaceGroupRouter";

const dataSource = process.env.NODE_ENV === "local" ? dataSourceLocal : dataSourceAuroraAWS;

console.log("🟡 Starting app...");

const app = express();

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
    const oldSend = res.send;
    res.send = function (data) {
        console.log(`Outgoing response: ${res.statusCode} - ${data}`);
        oldSend.call(res, data);
        return res;
    };
    next();
});

app.use(cors());
app.use(express.json());
app.use(spaceGroupRouter(dataSource));

console.log("✅ App ready 🚀🔥");

export default app;