const db = require('../database/db')

async function gitlink_table() {
  const gitlink_table_query = `
    CREATE TABLE IF NOT EXISTS git_links (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      git_link VARCHAR(255) NOT NULL,
      deployed_link VARCHAR(255) NOT NULL,
      UNIQUE (user_id,git_link)   
    )
  `
  // UNIQUE (user_id,git_link) -> this is the composite key
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
      INSERT INTO git_links (user_id, git_link, deployed_link)
      VALUES ($1, $2, $3)
      RETURNING *
    `
    try {
      const repoData = await db.query(GitLinkSaveQuery, [userId,git_link,deployed_link])
      return repoData.rows 
    } catch (error) {
      console.log(error);
      throw error
    }
}


// file: models/gitlinkQuery.js


// gitlink_table aur gitlinkSave ke saath ise bhi export karein
module.exports = { gitlink_table, gitlinkSave };