const Database = require('better-sqlite3');

//open or create the database file
const db = new Database('plex_content.db');

// Create a table - if it does not exist **do not need to make a db file, one will be created
db.exec(`
  CREATE TABLE IF NOT EXISTS plex_activity (
    id INTEGER PRIMARY KEY,
    show_title TEXT NOT NULL,
    episode_title TEXT NOT NULL,
    timestamp TEXT NOT NULL
  );
`);

console.log("Database and table created successfully.");

function insertActivity(showTitle, episodeTitle, timestamp) {
  const stmt = db.prepare(`
    INSERT INTO plex_activity (show_title, episode_title, timestamp)
    VALUES (?, ?, ?)
  `);
  stmt.run(showTitle, episodeTitle, timestamp);
}

module.exports = {
  insertActivity
};
