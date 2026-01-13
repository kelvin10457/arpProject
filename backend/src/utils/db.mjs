import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const pool = mysql.createPool({
    host: process.env.MYSQLHOST,     // Antes: DB_HOST
    user: process.env.MYSQLUSER,     // Antes: DB_USER
    password: process.env.MYSQLPASSWORD, 
    database: process.env.MYSQLDATABASE, 
    port: process.env.MYSQLPORT,     // Antes: DB_PORT
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});