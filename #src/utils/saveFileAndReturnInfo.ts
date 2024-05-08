import { UploadedFile } from "express-fileupload";
import * as fs from "async-file";
import { db } from "../config/db";
import { generateChar } from "./generateChar";
import { uploadToS3 } from "./s3";

export async function saveFileAndReturnInfo(
    file: UploadedFile,
    index: number
): Promise<{url: string, name: string}> {
    // Ваша логика обработки каждого файла
    const type = file.name.split(".")[file.name.split(".").length - 1];
    const genName = generateChar(35) + "." + type;
    const filePath = global.uploadDir + "/" + genName;
    await fs.writeFile(filePath, file.data);

    let info = {
        name: file.name,
        url: genName,
        timestamp: new Date().getTime(),
    };

    const params = {
        Bucket: 'galery.media',
        Key: `/${genName}`,
        Body: file.data
    }

    const s3Data = await uploadToS3(params)
    if (!s3Data) return {url: '', name: ''}

    try {
        await db.query(
            "INSERT INTO files (name, url, timestamp) VALUES ($1, $2, $3)",
            [file.name, genName, info.timestamp.toString()]
        );
    } catch {
        console.log("Ошибка сохранения файла в бд!");
    }

    return info;
}