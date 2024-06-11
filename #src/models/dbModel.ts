import { QueryResult } from "pg";
import { db } from "../config/db";

export async function dbQuery(query: string, args: any[] = []): Promise<[QueryResult<any>, null] | [null, any]> {
    try {
        const res = await db.query(query, args)
        return [res, null]
    } catch (e: any){
        console.log(e);
        return [null, e]
    }
}