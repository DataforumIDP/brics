import md5 from "md5";
import { dbQuery } from "../models/dbModel";

export async function createToken() {
    let token = ""
    let tokenRes:any

    do {
        token = md5(Math.random() + new Date().getTime() + "a");
        tokenRes = await dbQuery(`SELECT * FROM tokens WHERE token = $1`, [
            token,
        ]);
    } while (tokenRes[0]?.rowCount);

    return token
} 