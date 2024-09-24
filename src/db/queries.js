const pool = require("./pool");

async function insertUser(firstName, lastName, email, password, isMember) {
  await pool.query(
    `INSERT INTO users (first_name, last_name, email, password, isMember) VALUES ($1, $2, $3, $4, $5)`,
    [firstName, lastName, email, password, isMember]
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
getUserByEmail("daxantz@hotmail.com");
module.exports = {
  insertUser,
  getUsers,
  getUserById,
  getUserByEmail,
};
