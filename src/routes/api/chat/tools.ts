import { ANTHROPIC_API_KEY, TVLY_API_KEY as apiKey } from '$env/static/private';
import z from 'zod'
import { generateObject, simulateReadableStream } from 'ai';
import { tavily } from '@tavily/core';
import { createAnthropic } from '@ai-sdk/anthropic';
import { searchSchema, suggestionsSchema } from './schema';


const tvly = tavily({ apiKey });
const anthropic = createAnthropic({
	apiKey: ANTHROPIC_API_KEY
});

export const model =  anthropic('claude-3-haiku-20240307');
// Search Tool
export const Search = {
		description: 'Search the web for information',
		parameters: searchSchema,
		execute: async ({
											query,
											max_results,
											search_depth
										}: {
			query: string
			max_results: number
			search_depth: 'basic' | 'advanced'
		}) => tvly.search(query, {
			includeAnswer: true,
			includeImages: true,
			maxResults: max_results,
			searchDepth: search_depth
		})
}

// Generate Suggestions Tools
export const Suggestions = {
	description: 'Give several suggestions as to which follow-up questions you could ask',
		parameters: suggestionsSchema,
		execute: async ({ query }) => {
			const { object } = await generateObject({
				model,
				schema: z.object({
					suggestions: z.array(z.object({
						value: z.string().describe('The follow-up question as text in a maximum of 40 characters.'),
						emoji: z.string().describe('One matching emoji for the question'),
					}))}),
				prompt: `Give several suggestions as to which follow-up questions the user could ask on following Question: ${query}`,
			});
		return object?.suggestions
	},
}

export const streamResponse = (content: string) => {
	const chunks = content.split(' ').map(e => '0:"' + e + ' "\n').join('')
	return new Response(
		simulateReadableStream({
			initialDelayInMs: 50, // Delay before the first chunk
			chunkDelayInMs: 5, // Delay between chunks
			chunks
		})
	);

}