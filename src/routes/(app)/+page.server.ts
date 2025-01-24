import type { PageServerLoad } from './$types';
import limiter from '$server/limiter'

export const load: PageServerLoad = async (event) => {
	const remaning = await limiter.status(event);
	return { remaning, maxlength: 300};
};
