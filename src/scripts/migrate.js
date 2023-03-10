import { runQuery } from '../util/database.js';

async function run() {
	await runQuery(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      password TEXT NOT NULL,
      secret TEXT NOT NULL
    )  
  `);
	console.log('created users table!');
	const res = await runQuery(
		`
      INSERT INTO users (email, password, secret)
      VALUES ($email, $password, $secret)
    `,
		{ $email: 'test1@gmail.com', $password: '12345674', $secret: 'jrejfwd' }
	);
	console.log('res', res);
}

run().catch(console.log);
