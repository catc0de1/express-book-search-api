import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const createBookSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	author: z.string().min(1, 'Author is required'),
	year: z
		.number()
		.int()
		.min(1, 'Year invalid')
		.max(currentYear, `Year cannot be greater than ${currentYear}`),
	publisher: z.string().optional(),
	description: z.string().optional(),
	category: z.string().min(1, 'Category is required'),
	bookLocation: z.string().min(1, 'Book location is required').max(50, 'Book location invalid')
});
export type createBookSchema = z.infer<typeof createBookSchema>;
