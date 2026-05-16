const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const rawUrl = process.env.DATABASE_URL;
const client = new Client({ connectionString: rawUrl });

async function migrate() {
  try {
    console.log("Connecting to Supabase...");
    await client.connect();
    console.log("Connected.");

    const sqlPath = path.join(__dirname, "..", "supabase", "schema.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    console.log("Executing schema...");
    await client.query(sql);
    console.log("Schema executed successfully.");

    const tables = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' ORDER BY table_name
    `);
    console.log("Tables created:", tables.rows.map(r => r.table_name).join(", "));

    for (const row of tables.rows) {
      try {
        const res = await client.query("SELECT count(*)::int as cnt FROM " + row.table_name);
        console.log("  " + row.table_name + ": " + res.rows[0].cnt + " rows");
      } catch (e) {
        console.log("  " + row.table_name + ": (error: " + e.message + ")");
      }
    }

    await client.end();
    console.log("Done.");
  } catch (err) {
    console.error("Migration error:", err.message);
    try { await client.end(); } catch (e) {}
    process.exit(1);
  }
}

migrate();