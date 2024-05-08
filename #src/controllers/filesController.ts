import { Request, Response } from "express";
import { saveFileAndReturnInfo } from "../utils/saveFileAndReturnInfo";
import { isNotArray } from "../utils/isNoArray";

import * as fs from "async-file";
import { s3 } from "../config/s3";
import { getFromS3, getRangeFromS3 } from "../utils/s3";
import { ReqWithParams } from "../baseTypes";

export class File {
    async upload(req: Request, res: Response) {
        if (!req.files || Object.keys(req.files).length === 0) return false;
        const files = Object.values(req.files).filter(isNotArray);

        const filePaths: { url: string; name: string }[] = await Promise.all(
            files.map(saveFileAndReturnInfo)
        );

        return res.status(200).json({
            status: "ok",
            files: filePaths,
        });
    }

    async get(req: ReqWithParams<{ file: string }>, res: Response) {
        const { file } = req.params;

        const fileType = file.split(".").at(-1) ?? "";

        const params = {
            Bucket: "galery.media",
            Key: file,
        };
        if (req.headers.range) return await getRangeFromS3(req, res, params)

        const fileFromS3 = await getFromS3(params);

        if (!fileFromS3 || !fileFromS3.Body)
            return res.status(404).json({ status: "file not found!" });

        return res.send(fileFromS3.Body);
    }
}
