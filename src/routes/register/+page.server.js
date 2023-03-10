import { authenticator } from 'otplib';
import { runQuery } from '../../util/database';
import * as bcrypt from 'bcrypt';
import { redirect } from '@sveltejs/kit';

/**
 * @type {import('@sveltejs/kit').Actions}
 */
export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const secret = authenticator.generateSecret();
		const createUser = await runQuery(
			`
      INSERT INTO users (email, password, secret)
      VALUES ($email, $password, $secret)    
    `,
			{
				$email: email,
				$password: await bcrypt.hash(password, 10),
				$secret: secret
			}
		);
		const authKey = authenticator.keyuri(email, 'SvelteKit App', secret);
		cookies.set('userId', createUser.lastID);
		cookies.set('key', authKey);
		throw redirect(302, '/settings');
	}
};
