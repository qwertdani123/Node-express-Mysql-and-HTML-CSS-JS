import { createPool } from "mysql2/promise";

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "juanydani123",
    port: 3306,
    database: "inmobiliaria",
});

export default pool;

