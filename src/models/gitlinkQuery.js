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

async function gitlinkSave(userId, git_link,deployed_link) {
  const GitLinkSaveQuery = `
      INSERT INTO gitlink_table (user_id, git_link, deployed_link)
      VALUES ($1, $2, $3) RETURNING *;
    `
    try {
      const repoData = await db.query(GitLinkSaveQuery, [userId,git_link,deployed_link])
      return repoData.rows[0]
    } catch (error) {
      console.log(error);
    }
}

module.exports = { gitlink_table, gitlinkSave }