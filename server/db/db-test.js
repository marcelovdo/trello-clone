import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";

const sql = postgres({
  host: "postgres-test",
  port: 5432,
  database: "postgres-test",
  username: "postgres",
  password: "1234",
});

export default sql;

