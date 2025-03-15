import { DataSource, type Repository } from "typeorm";
import config from "../config.json";
import mysql from "mysql2/promise";
import { User } from "../users/user.model";

export interface Database {
  User: Repository<User>;
}

export const db: Database = {} as Database;

initialize();

async function initialize() {
  const cf = config as {
    database: {
      host: string;
      port: string;
      user: string;
      password: string;
      database: string;
    };
  };
  const { host, port, user, password, database } = cf.database;

  const connection = await mysql.createConnection({
    host,
    port: Number.parseInt(port),
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

  const datasource = new DataSource({
    type: "mysql",
    host,
    port: +port,
    username: user,
    password,
    database,
    entities: [User],
    synchronize: true,
  });
  db.User = datasource.getRepository(User);
  await datasource.initialize();
}

export default db;
