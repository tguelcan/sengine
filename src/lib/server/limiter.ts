import Redis from "ioredis"
import { KV_URL } from '$env/static/private';

const redis = new Redis(KV_URL)
const initialCredits: number = 10

const store = {
	// Subtract one credit
	subtract: async ({ getClientAddress }) => {
		const ip = getClientAddress();
		let count = await redis.get(ip) || initialCredits;
		count = Number(count)-1;
		await redis.set(ip, count);
	},
	// Ask status
	status: async ({ getClientAddress }) => {
		const ip = getClientAddress()
		const count = await redis.get(ip);
		const usersCredits = Number(count) || 0
		// Prevent negative numbers
		return usersCredits <= 0 ? 0 : usersCredits
	}
};

export default store;