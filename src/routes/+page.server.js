import { redirect } from '@sveltejs/kit';

/**
 * @type {import('./$types').PageServerLoad}
 */
export async function load({ locals }) {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	if (!locals.otpAuthenticated) {
		throw redirect(302, '/otp');
	}
}
