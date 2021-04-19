"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileController_1 = require("./Controller/FileController");
const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyParser = require('body-parser');
const app = express();
const multer = require("multer");
const httpServer = http.createServer(app);
app.use(cors());
httpServer.listen(3000, () => {
    console.log("server created on port 3000!");
});
// app.use({
//     methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH', 'COPY'],
//     allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-LoginSource', 'X-Security-AuthKey', 'Authorization'],
//     credentials: true,
//     exposedHeaders: ['Link', 'EntityLink', 'UserLink', 'GroupLink', 'ProjectLink']
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
const router = express.Router();
app.use("/", router);
router.get("/Files", (req, res) => { new FileController_1.FileController().ReadFile(req, res); });
router.post("/Files", (req, res) => { new FileController_1.FileController().CreateFile(req, res); });
router.put("/Files/Rename", (req, res) => { new FileController_1.FileController().RenameFile(req, res); });
router.put("/Files", (req, res) => { new FileController_1.FileController().AppendFile(req, res); });
router.delete("/Files", (req, res) => { new FileController_1.FileController().DeleteFile(req, res); });
router.copy("/Files", (req, res) => { new FileController_1.FileController().MoveFile(req, res); });
router.post("/Files/Upload", FileController_1.upload.single("File"), (req, res) => { new FileController_1.FileController().UploadFile(req, res); });
//# sourceMappingURL=Index.js.map