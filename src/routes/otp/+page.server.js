import { redirect } from '@sveltejs/kit';
import { authenticator } from 'otplib';
import { getUser } from '../../util/database';

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
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});
			throw redirect(302, '/');
		}
		throw redirect(302, '/otp?error=invalide_code');
	}
};

/**
 * @type {import('./$types').PageServerLoad}
 */
export async function load({ url }) {
	return {
		error: url.searchParams.get('error')
	};
}
