import * as Excel from "exceljs";

export function excelFromObject(obj: object[], dict: object): [Excel.Workbook, null] | [null, any] {
    try {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("Partners");

        // Определяем заголовки столбцов на основе ключей первого объекта в массиве
        worksheet.columns = Object.keys(obj[0]).map((key) => ({
            header: dict[key] ?? key,
            key: key,
        }));

        // Добавляем строки в Excel файл
        worksheet.addRows(obj);
        console.log(obj);
        
        return [workbook, null];

    } catch (err) {
        return [null, err]
    }
}
