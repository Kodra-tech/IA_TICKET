const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

// Configuración directa para Supabase
const config = {
  host: "db.ammufrkaqhprihjvbinl.supabase.co",
  port: 5432,
  user: "postgres",
  password: "@B1\\y3P642Y{ZzP",
  database: "postgres",
  ssl: { rejectUnauthorized: false },
};

async function run() {
  console.log("Conectando a Supabase...");
  const client = new Client(config);

  try {
    await client.connect();
    console.log("Conectado exitosamente.");

    const sql = fs.readFileSync(
      path.join(__dirname, "..", "supabase", "schema.sql"),
      "utf8"
    );

    console.log("Ejecutando schema...");
    await client.query(sql);
    console.log("Schema ejecutado correctamente.");

    // Verificar tablas
    const res = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' ORDER BY table_name
    `);
    console.log("Tablas creadas:", res.rows.map(r => r.table_name).join(", "));

    // Contar registros
    for (const row of res.rows) {
      const count = await client.query(
        "SELECT count(*)::int as cnt from " + row.table_name
      );
      console.log("  " + row.table_name + ": " + count.rows[0].cnt + " registros");
    }

    await client.end();
    console.log("Migración completada.");
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

run();