import {Pool} from 'pg'

const {DB_BR_USER, DB_BR_PASSWORD, DB_BR_HOST, DB_BR_NAME} = process.env

export const db = new Pool({
    user: DB_BR_USER, 
    password: DB_BR_PASSWORD,
    host: DB_BR_HOST,
    port: 5432,
    database: DB_BR_NAME
}
)