require("dotenv").config({ path: "../../.env" });
const { Client } = require("pg");

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_PORT:", process.env.DB_PORT);

const SQL = `
CREATE TABLE IF NOT EXISTS users  (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR (255) NOT NULL,
  last_name VARCHAR (255) NOT NULL,
  email VARCHAR (255) NOT NULL,
  password VARCHAR (255) NOT NULL, 
  isMember boolean NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 255 ) NOT NULL,
  timestamp date NOT NULL, 
  text VARCHAR (255) NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id)
);


INSERT INTO users (first_name, last_name, email, password, isMember)
VALUES ('alice', 'baker', 'alicebaker@gmail.com', '1234', true),
        ('Devin', 'piece', 'dpiece@yahoo.com', 'sick', false);


INSERT INTO messages (title, timestamp, text, user_id)
VALUES
    ('First Message', CURRENT_DATE, 'This is the text of the first message.', 1),
    ('Second Message', CURRENT_DATE, 'Here is some text for the second message.', 1),
    ('Third Message', CURRENT_DATE, 'Text for the third message goes here.', 2);



`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
