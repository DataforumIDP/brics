import { Response, query } from "express";
import { QueryResult } from "pg";
import { db } from "../config/db";
import { dbError } from "../models/errorModels";



export async function queryFromBd(query: string, args: any[] = []): Promise<QueryResult<any> | undefined> {
    try {
        const res = await db.query(query, args)
        return res
    } catch (e: any){
        console.log(e);
    }
}