import { Request } from 'express';
import fileUpload from 'express-fileupload';

export interface CustomRequest extends Request {
    files: {
        file: fileUpload.UploadedFile;
    };
}