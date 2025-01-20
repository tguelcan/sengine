import type { RequestHandler } from './$types';
import { type CoreMessage, streamText } from 'ai';

export const config = {
	runtime: 'edge',
};

import { Search, Suggestions, model, streamResponse } from './tools';
import limiter from '$server/limiter';

export const POST = (async (event) => {
	const { request } = event;
	const { messages }: { messages: CoreMessage[] } = await request.json();


	// Check length of input message
	const lastMessage = [...messages].pop();
	if (lastMessage.content.length > 300) {
		return streamResponse('Your question is to long. Please try again with a shorter question.')
	}

	// Count up limiter
	limiter.add(event);
	const creditStatus = limiter.status(event);
	if (creditStatus <= 0) {
		return streamResponse('You have no credits left. Contact me, if you do cool stuff!')
	}

	const result = streamText({
		model,
		maxSteps: 4,
		system: `As a professional search expert, you possess the ability to search for public information on the internet and provide answers to user queries.
			For each user query, utilize the search results to their fullest potential to provide additional information and assistance in your response.
			Aim to be as helpful and detailed as possible by looking at information contents.
			Clarify languages or any other user intent to provide the best results.
		Whenever quoting or referencing information from a specific URL, always cite the source URL explicitly. Try to use the Search tool to improve your results. After an answer has been given, use the Suggestions tool to suggest further possible follow-up questions at the end.`,
		messages,
		tools: {
			Suggestions,
			Search
		}
	});


	return result.toDataStreamResponse();
}) satisfies RequestHandler;
