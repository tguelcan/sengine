import type { PageServerLoad } from './$types';
import limiter from '$server/limiter'

export const load: PageServerLoad = async (event) => {
	return { remaning: limiter.status(event), maxlength: 300};
};
