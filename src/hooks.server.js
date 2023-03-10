import { getUser } from './util/database';

/**
 * @type {import('@sveltejs/kit').Handle}
 */
export async function handle({ event, resolve }) {
	const userId = event.cookies.get('userId');
	const otpAuthenticated = event.cookies.get('otp_authenticated');
	if (userId) {
		const user = await getUser(userId);
		event.locals.user = user;
	}
	event.locals.otpAuthenticated = otpAuthenticated;
	const response = await resolve(event);
	return response;
}
