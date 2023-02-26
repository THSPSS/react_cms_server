//"use strict"

import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();



//createPool saving source for using server
//db config 
//not username but user
const config = {
    host : process.env.DB_HOST,
    user : process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database : process.env.DB_DBNAME,
    port : process.env.DB_PORT
};
//db connection
const db = mysql.createPool(config).promise();

export default db;

