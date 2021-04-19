import { DirectoryPath, NewDirectoryPath, FileUploadDirectoryPath } from "../AppConfig";
import * as path from "path";
const fs = require("fs");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: async function (req, file, cb)
    {
        let dir = FileUploadDirectoryPath;
            
        if (!fs.existsSync(dir)) 
        {
            fs.mkdirSync(dir, { recursive: true })
        }   
        try
        {
            cb(null, dir);
        }
        catch (error)
        {
            cb(null, dir);
        }
    },
    filename: function (req, file, cb)
    {
        cb(null, file.originalname);
    },
});

export var upload = multer({ storage: storage });

export class FileController {   
    private async CreateDirectory(directoryPath: string)  {
        try {
            if (!fs.existsSync(directoryPath)){
                fs.mkdirSync(directoryPath,  { recursive: true });       
            }
            return true;
        }
        catch(ex) {
            console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);          
            return false;
        }
    }

    async CreateFile(req, res) {
        try {
            let fileName: string = req.body.FileName;
            let fileContent: string = req.body.Data;
            let directoryPath: string = req.body.DirectoryPath ? req.body.DirectoryPath : DirectoryPath;
            let fileFullName: string = path.join(directoryPath, fileName);

            let directoryExists: boolean = await this.CreateDirectory(directoryPath);

            if(directoryExists) {

                fs.writeFileSync(fileFullName, fileContent);

                res.status(200).send("File write successful!");

            }
            else {
                res.status(500).send("Directory not created!!");
            }
        }
        catch(ex) {
            console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
            res.status(500).send("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
        }
    }

    async RenameFile(req, res) {
        try {
            let oldFileName: string = req.body.OldFileName;
            let newFileName: string = req.body.NewFileName;
            let directoryPath: string = req.body.DirectoryPath ? req.body.DirectoryPath : DirectoryPath;
            let oldFileFullName: string = path.join(directoryPath, oldFileName);
            let newFileFullName: string = path.join(directoryPath, newFileName);
            if (fs.existsSync(oldFileFullName)) {               
                fs.renameSync(oldFileFullName, newFileFullName);
                res.status(200).send("File rename successful!");
            }
            else {
                res.status(404).send("File not Found!!");
            }
        }
        catch(ex) {
            console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
            res.status(500).send("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
        }
    }

    async AppendFile(req, res) {
        try {
            let fileName: string = req.body.FileName;
            let data: string = req.body.Data;
            let directoryPath: string = req.body.DirectoryPath ? req.body.DirectoryPath : DirectoryPath;
            let fileFullName: string = path.join(directoryPath, fileName);
            
            if (fs.existsSync(fileFullName)) {
                fs.appendFileSync(fileFullName, data);
                res.status(200).send("File append successful!");
            }
            else {
                res.status(404).send("File not Found!!");
            }
        }
        catch(ex) {
            console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
            res.status(500).send("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
        }
    }
    /*
    async ReadFile(req, res) {
        try {

            let fileName: string = req.query.FileName;
            let directoryPath: string = req.query.DirectoryPath ? req.query.DirectoryPath : DirectoryPath;
            let fileFullName: string = path.join(directoryPath, fileName);

            if (fs.existsSync(fileFullName)) {      
                let fileData = fs.readFileSync(fileFullName);
                res.status(200).send(fileData);
            }
            else {
                res.status(404).send("File not Found!!");
            }
        }
        catch(ex) {
            console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
            res.status(500).send("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
        }
    }

    async DeleteFile(req, res) {
        try {
           let directoryPath: string = req.query.DirectoryPath ? req.query.DirectoryPath : DirectoryPath;
            if (fs.existsSync(directoryPath)) {
                fs.rmdirSync(directoryPath, { recursive: true });
                res.status(200).send("File delete successful!");
            }
            else {
                res.status(404).send("Directory not Found!!");
            }
        }
        catch(ex) {
            console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
            res.status(500).send("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
        }
    }

    async MoveFile(req, res) {
        try {
            let fileName: string = req.query.FileName;
            let oldDirectoryPath: string = req.query.OldDirectoryPath ? req.query.OldDirectoryPath : DirectoryPath;
            let newDirectoryPath: string = req.query.NewDirectoryPath ? req.query.NewDirectoryPath : NewDirectoryPath;
            let oldFileFullName: string = path.join(oldDirectoryPath, fileName);
            let newFileFullName: string = path.join(newDirectoryPath, fileName);
            if (fs.existsSync(oldFileFullName)) {
                let directoryExists: boolean = await this.CreateDirectory(newDirectoryPath);      
                
                if(directoryExists) {
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
        catch(ex) {
            console.error("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
            res.status(500).send("Message : " + ex.message + " :: stacktrace : " + ex.stacktrace);
        }
    }

    async UploadFile(req, res) {
        let dir = __dirname;
        let fileName: string = req.file.originalname;
        let directoryPath: string = FileUploadDirectoryPath;
        let fileFullName: string = path.join(directoryPath, fileName);

        if (fs.existsSync(fileFullName)) {
            res.status(200).send("File upload successful!");
        }
        else {
            res.status(500).send("File not uploaded!");
        }        
    }
    */
}
