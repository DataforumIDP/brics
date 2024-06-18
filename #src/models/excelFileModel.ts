import { Request } from 'express';
import fileUpload from 'express-fileupload';

export interface RequestWithTable extends Request {
    files: {
        file: fileUpload.UploadedFile;
    };
    table: any[]
}