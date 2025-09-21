const db = require('../database/db')

async function gitlink_table() {
  const gitlink_table_query = `
    CREATE TABLE IF NOT EXISTS git_links (
      id SERIAL PRIMARY KEY,
      user_id INTEGER UNIQUE REFERENCES users(id),
      git_link VARCHAR(255) UNIQUE NOT NULL,
      deployed_link VARCHAR(255) UNIQUE NOT NULL
    )
  `

  try {
    const result = await db.query(gitlink_table_query)
    console.log("git_links table created successfully")
    return result
  } catch (e) {
    console.error("Error creating git_links table:", e)
  }
}

module.exports = {gitlink_table}