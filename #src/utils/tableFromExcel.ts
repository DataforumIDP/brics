import { UploadedFile } from "express-fileupload";
import * as Excel from "exceljs";
import { RegTechniciansData } from "../models/user/createDataModel";

const dictionary = ["surname", "name", "lastname", "passport", "organization", "grade", "activity"]

export async function getTableFromExcel(file: UploadedFile) {
    const workbook = new Excel.Workbook()
    await workbook.xlsx.load(file.data)
    const worksheet = workbook.getWorksheet(1);

    if (!worksheet) return false

    let obj: any[] = []
    
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber)=> {
        if (rowNumber == 1) return

        let rowInTable = {}

        row.eachCell({ includeEmpty: false }, (cell, cellNumber)=> {
            rowInTable[dictionary[cellNumber-1]] = cell.text
        })
        obj.push(rowInTable)
    })

    return obj as RegTechniciansData[]
}