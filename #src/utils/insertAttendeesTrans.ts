import { db } from "../config/db";
import { RegAttendeesData } from "../models/user/createDataModel";



export async function insertAttendees(data: RegAttendeesData & { timestamp: number }) {

    const client = await db.connect()
    const {name, surname, lastname = '', organization, grade, mail, phone, country, city, timestamp} = data

    try {
        await client.query('BEGIN');
        const insertResult = await client.query(
            `/* SQL */ 
            INSERT INTO attendees 
            (name, surname, lastname, organization, grade, mail, phone, country, city, code, timestamp) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, (SELECT id FROM qrs WHERE used = false LIMIT 1 FOR UPDATE), $10) 
            RETURNING *`, 
            [name, surname, lastname, organization, grade, mail, phone, country, city, timestamp.toString()]
        )

        const user = insertResult.rows[0] 

        const updateResult = await client.query(
            `/* SQL */ 
            UPDATE qrs
            SET used=true
            WHERE id=$1`, 
            [user.code]
        )
        
        await client.query('COMMIT');
        return [user, null]
    } catch (e) {
        await client.query('ROLLBACK');
        return [null, e]
    } finally {
        client.release();
    }
    
}