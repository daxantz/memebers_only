const pool = require("./pool");

async function insertUser(firstName, lastName, email, password) {
  await pool.query(
    `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)`,
    [firstName, lastName, email, password]
  );
}

async function getUsers() {
  const users = await pool.query("SELECT * FROM users");
  return users.rows;
}

async function getUserById(id) {
  const user = await pool.query("SELECT * from users WHERE id = $1", [id]);
  return user.rows[0];
}
async function getUserByEmail(email) {
  const user = await pool.query("SELECT * from users WHERE email = $1", [
    email,
  ]);
  return user.rows[0];
}
async function updateUserMemberStatus(id) {
  await pool.query("UPDATE users SET isMember = true WHERE id = $1 ", [id]);
}

async function insertMessage(title, text, timestamp, id) {
  await pool.query(
    "INSERT INTO messages (title,text, timestamp,  user_id ) VALUES ($1, $2, $3, $4)",
    [title, text, timestamp, id]
  );
}

async function getMemberMessages() {
  const messages = await pool.query(
    "Select title, timestamp, text, email, isMember from messages inner join users on messages.user_id = users.id where users.isMember = true"
  );
  console.log(messages.rows);
  return messages.rows;
}

module.exports = {
  insertUser,
  getUsers,
  getUserById,
  getUserByEmail,
  updateUserMemberStatus,
  insertMessage,
  getMemberMessages,
};
