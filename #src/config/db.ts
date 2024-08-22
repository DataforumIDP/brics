import {Pool} from 'pg'

const {DB_USER, DB_PASSWORD, DB_HOST, DB_BR_NAME} = process.env

export const db = new Pool({
    user: "db_admin",
    password: "9005553535",
    host: "188.68.217.95",
    port: 5432,
    database: "brics"
}
)