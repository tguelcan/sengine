
const credits = 10;

const memStorage: {
	ip: string;
}[] = [];

const store = {
	add: ({ getClientAddress }) => {
		const ip = getClientAddress();
		console.log(ip)
		memStorage.push({
			ip: getClientAddress(),
		});
	},
	status: ({ getClientAddress }) => {
		const usersIp = getClientAddress()
		console.log(usersIp)
		const count = memStorage.filter(user => user.ip === usersIp);

		const usersCredits = credits - count.length

		// Prevent negative numbers
		return usersCredits <= 0 ? 0 : usersCredits
	}
};

export default store;