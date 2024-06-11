import { Request, Response } from "express";
import { saveFileAndReturnInfo } from "../utils/saveFileAndReturnInfo";
import { isNotArray } from "../utils/isNoArray";
import { ReqWithParams } from "../baseTypes";
import { getFromS3, getRangeFromS3 } from "../utils/s3";

export class File {
    async upload(req: Request, res: Response) {
        // 
        if (!req.files || Object.keys(req.files).length === 0) return res.json({ee: false})

        const files = Object.values(req.files).filter(isNotArray);
        
        const filePaths: any[] = await Promise.all(
            files.map(saveFileAndReturnInfo)
        );

        const data = filePaths.map(([val]) => val);

        return res.status(200).json({
            files: data,
        });
    }

    async get(req: ReqWithParams<{ file: string }>, res: Response) {
        const { file } = req.params;

        const params = {
            Bucket: "brics.media",
            Key: file,
        };
        if (req.headers.range) return await getRangeFromS3(req, res, params);

        const fileFromS3 = await getFromS3(params);

        if (!fileFromS3 || !fileFromS3.Body)
            return res.status(404).json({ status: "file not found!" });

        return res.send(fileFromS3.Body);
    }
}
