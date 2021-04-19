"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = exports.upload = void 0;
const AppConfig_1 = require("../AppConfig");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            let dir = AppConfig_1.FileUploadDirectoryPath;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            try {
                cb(null, dir);
            }
            catch (error) {
                cb(null, dir);
            }
        });
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
exports.upload = multer({ storage: storage });
class FileController {
    CreateDirectory(directoryPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!fs.existsSync(directoryPath)) {
                    fs.mkdirSync(directoryPath, { recursive: true });
                }
                return true;
            }
            catch (ex) {
                console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
                return false;
            }
        });
    }
    CreateFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileName = req.body.FileName;
                let fileContent = req.body.Data;
                let directoryPath = req.body.DirectoryPath ? req.body.DirectoryPath : AppConfig_1.DirectoryPath;
                let fileFullName = path.join(directoryPath, fileName);
                let directoryExists = yield this.CreateDirectory(directoryPath);
                if (directoryExists) {
                    fs.writeFileSync(fileFullName, fileContent);
                    res.status(200).send("File write successful!");
                }
                else {
                    res.status(500).send("Directory not created!!");
                }
            }
            catch (ex) {
                console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
                res.status(500).send("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
            }
        });
    }
    RenameFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let oldFileName = req.body.OldFileName;
                let newFileName = req.body.NewFileName;
                let directoryPath = req.body.DirectoryPath ? req.body.DirectoryPath : AppConfig_1.DirectoryPath;
                let oldFileFullName = path.join(directoryPath, oldFileName);
                let newFileFullName = path.join(directoryPath, newFileName);
                if (fs.existsSync(oldFileFullName)) {
                    fs.renameSync(oldFileFullName, newFileFullName);
                    res.status(200).send("File rename successful!");
                }
                else {
                    res.status(404).send("File not Found!!");
                }
            }
            catch (ex) {
                console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
                res.status(500).send("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
            }
        });
    }
    AppendFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileName = req.body.FileName;
                let data = req.body.Data;
                let directoryPath = req.body.DirectoryPath ? req.body.DirectoryPath : AppConfig_1.DirectoryPath;
                let fileFullName = path.join(directoryPath, fileName);
                if (fs.existsSync(fileFullName)) {
                    //this is async append function, using callback for error logging and sending response
                    // fs.appendFile(fileFullName, data, function (err) {
                    //     if (err) {
                    //         console.error("Message : " + err.message + " :: stacktrace : " + err.stacktrace);
                    //         res.status(500).send("Message : " + err.message + " :: stacktrace : " + err.stacktrace);
                    //     }
                    //     res.status(200).send("File rename successful!");
                    //   });
                    //this is sync function for appending in file
                    fs.appendFileSync(fileFullName, data);
                    res.status(200).send("File append successful!");
                }
                else {
                    res.status(404).send("File not Found!!");
                }
            }
            catch (ex) {
                console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
                res.status(500).send("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
            }
        });
    }
    ReadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileName = req.query.FileName;
                let directoryPath = req.query.DirectoryPath ? req.query.DirectoryPath : AppConfig_1.DirectoryPath;
                let fileFullName = path.join(directoryPath, fileName);
                if (fs.existsSync(fileFullName)) {
                    let fileData = fs.readFileSync(fileFullName);
                    res.status(200).send(fileData);
                }
                else {
                    res.status(404).send("File not Found!!");
                }
            }
            catch (ex) {
                console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
                res.status(500).send("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
            }
        });
    }
    DeleteFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let directoryPath = req.query.DirectoryPath ? req.query.DirectoryPath : AppConfig_1.DirectoryPath;
                if (fs.existsSync(directoryPath)) {
                    fs.rmdirSync(directoryPath, { recursive: true });
                    res.status(200).send("File delete successful!");
                }
                else {
                    res.status(404).send("Directory not Found!!");
                }
            }
            catch (ex) {
                console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
                res.status(500).send("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
            }
        });
    }
    MoveFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let fileName = req.query.FileName;
                let oldDirectoryPath = req.query.OldDirectoryPath ? req.query.OldDirectoryPath : AppConfig_1.DirectoryPath;
                let newDirectoryPath = req.query.NewDirectoryPath ? req.query.NewDirectoryPath : AppConfig_1.NewDirectoryPath;
                let oldFileFullName = path.join(oldDirectoryPath, fileName);
                let newFileFullName = path.join(newDirectoryPath, fileName);
                if (fs.existsSync(oldFileFullName)) {
                    let directoryExists = yield this.CreateDirectory(newDirectoryPath);
                    if (directoryExists) {
                        fs.renameSync(oldFileFullName, newFileFullName);
                        res.status(200).send("File move successful!");
                    }
                    else {
                        res.status(500).send("Directory not created!!");
                    }
                }
                else {
                    res.status(404).send("File not Found!!");
                }
            }
            catch (ex) {
                console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
                res.status(500).send("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
            }
        });
    }
    UploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let dir = __dirname;
            let fileName = req.file.originalname;
            let directoryPath = AppConfig_1.FileUploadDirectoryPath;
            let fileFullName = path.join(directoryPath, fileName);
            if (fs.existsSync(fileFullName)) {
                res.status(200).send("File upload successful!");
            }
            else {
                res.status(500).send("File not uploaded!");
            }
        });
    }
}
exports.FileController = FileController;
//# sourceMappingURL=FileController.js.map