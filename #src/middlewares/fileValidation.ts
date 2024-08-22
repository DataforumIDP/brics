import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { isNotArray } from "../utils/isNoArray";

export async function filesValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { files } = req;

    if (!files || Object.keys(files).length === 0) return sendError(res, 'Необходимо загрузить файл')
        
    const formatedFiles = Object.values(files).filter(isNotArray);

    if (typeNoAccept(formatedFiles)) return sendError(res, 'Вы загружаете файл не разрешенного типа!')
    if (fileTooBig(formatedFiles)) return sendError(res, 'Вы загружаете слишком большой файл!')

    return next()
}

const acceptFileTypes = [
    "jpg",
    "jpeg",
    "pptx",
    "ppt",
    "docx",
    "doc",
    "odt",
    "odp",
    "pdf",
    "png",
    "mp4",
    "avi",
    "mkv"
];


function typeNoAccept(files: UploadedFile[]) {
    return files.find((file: UploadedFile)=>{
        const fileType = file.name.split(".").pop() ?? "";
        return (acceptFileTypes.indexOf(fileType) == -1)? true : false;
    })
}

function fileTooBig(files: UploadedFile[]) {
    return files.find((file: UploadedFile)=>{
        const fileSize = file.size
        const fileType = file.name.split(".").pop() ?? "";
        const sizeLimt = 1024 * 1024 * ((["mp4", "avi", "mkv"].includes(fileType))?  750 : 50)
        return (fileSize > sizeLimt)? true : false;
    })
}


function sendError(res: Response, text: string) {
    res.status(400).json({
        status: "error",
        error: text
    });
}