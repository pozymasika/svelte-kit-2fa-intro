import { redirect } from '@sveltejs/kit';
import { getDatabase, getUser } from '../../util/database';
import QRCode from 'qrcode';
import { authenticator } from 'otplib';

/**
 * @type {import('./$types').Actions}
 */
export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const code = formData.get('code');
		const userId = cookies.get('userId');
		const user = await getUser(userId);
		if (authenticator.check(code, user.secret)) {
			cookies.set('otp_authenticated', '1', {
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});
			throw redirect(302, '/');
		}
		throw redirect(302, '/settings?error=invalide_code');
	}
};

/**
 * @type {import('./$types').PageServerLoad}
 */
export async function load({ cookies, url: pageUrl }) {
	const userId = cookies.get('userId');
	const key = cookies.get('key');
	if (!userId || !key) {
		throw redirect(302, '/register');
	}
	const db = await getDatabase();
	const user = await new Promise((resolve, reject) => {
		db.get('SELECT email FROM users WHERE id = ?', [userId], (err, row) => {
			if (err) return reject(err);
			resolve(row);
		});
	});

	const url = await QRCode.toDataURL(key);
	return {
		url,
		user,
		error: pageUrl.searchParams.get('error')
	};
}
