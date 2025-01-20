export const config = {
	runtime: 'edge',
};

const credits = 10;

const memStorage: {
	ip: string;
}[] = [];

const store = {
	add: ({ getClientAddress }) => {
		const ip = getClientAddress();
		memStorage.push({
			ip
		});
	},
	status: ({ getClientAddress }) => {
		const ip = getClientAddress()
		const count = memStorage.filter(user => user.ip === ip);

		const usersCredits = credits - count.length

		// Prevent negative numbers
		return usersCredits <= 0 ? 0 : usersCredits
	}
};

export default store;