import { z } from 'zod'

export const searchSchema = z.object({
	query: z.string().describe('The query to search for'),
	max_results: z
		.number()
		.max(20)
		.default(4)
		.describe('The maximum number of results to return'),
	search_depth: z
		.enum(['basic', 'advanced'])
		.default('basic')
		.describe('The depth of the search')
})

export const suggestionsSchema = z.object({
	query: z.string().describe('The query to search for')
})
