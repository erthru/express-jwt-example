import express from "express";
import { createServer } from "http";
import cors from "cors";
import routes from "./routes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(cors());
app.use(routes);

const server = createServer(app);

server.listen(PORT, () => {
    console.log("⚡️[SERVER]: RUNNING");
    console.log(`⚡[PORT]: ${PORT}`);
    console.log("⚡️[MESSAGE]: エブリシングOK、頑張ってねー、エルトホルくん。ヽ(o＾▽＾o)ノ");
});
