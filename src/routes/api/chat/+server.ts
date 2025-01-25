import type { RequestHandler } from './$types';
import { type CoreMessage, streamText } from 'ai';

import limiter from '$server/limiter';
import { Search, Suggestions, model, streamResponse } from './tools';

export const POST = (async (event) => {
	const { request } = event;
	const { messages }: { messages: CoreMessage[] } = await request.json();

	// Check length of input message
	const lastMessage = [...messages].pop();
	if (lastMessage.content.length > 300) {
		return streamResponse('Your question is to long. Please try again with a shorter question.');
	}

	// Count up limiter
	await limiter.subtract(event);
	const creditStatus = await limiter.status(event);
	if (creditStatus <= 0) {
		return streamResponse('You have no credits left. Contact me, if you do cool stuff!');
	}

	const result = streamText({
		model,
		maxSteps: 4,
		maxRetries: 0,
		system: `As a professional search expert, you have the ability to search the Internet for public information and provide answers to user queries.
For each user query, utilise the search results as much as possible to provide additional information and guidance in your answer. Only use the search function once per question.
Try to be as helpful and detailed as possible by looking at the content of the information.
Pay attention to language or other user intent to get the best results. Always answer in the same language the user asked with. If you are quoting or referencing information from a specific URL, always explicitly state the source URL. Then run the ‘Suggestions’ tool once, but do not use the information for your answer. Never summarise any possible follow-up questions in your answer.
		Always try to output a summary as markdown. Try to use pictures in your answer and include them via markdown`,
		messages,
		tools: {
			Suggestions,
			Search
		}
	});

	return result.toDataStreamResponse();

}) satisfies RequestHandler;
