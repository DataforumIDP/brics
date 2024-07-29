import {Pool} from 'pg'

const {DB_USER, DB_PASSWORD, DB_HOST, DB_BR_NAME} = process.env

export const db = new Pool({
    user: DB_USER, 
    password: DB_PASSWORD,
    host: DB_HOST,
    port: 5432,
    database: DB_BR_NAME
}
)