import { varchar, text, mysqlTable, int } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  id: int().primaryKey(),
  name: varchar("255"),
  password: varchar("255")
});