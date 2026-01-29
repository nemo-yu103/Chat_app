import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { usersTable } from "./Schema";


const connection = await mysql.createConnection({
    host: "172.16.2.26",
    user: "team1",
    database: "team1_db",
    password: "",
});
const db = drizzle({ client: connection });


const express = require('express')
const app = express()







export const Test = () => {
    const result =db.select({
        id: usersTable.id,
        name: usersTable.name,
        password: usersTable.password
    }).from(
        usersTable
    )


}


