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

export const updateBookSchema = z
	.object({
		title: z.string().min(1).optional(),
		author: z.string().min(1).optional(),
		year: z
			.number()
			.int()
			.min(1, 'Year invalid')
			.max(currentYear, `Year cannot be greater than ${currentYear}`)
			.optional(),
		publisher: z.string().optional(),
		description: z.string().optional(),
		category: z.string().min(1).optional(),
		bookLocation: z.string().min(1).max(50, 'Book location invalid').optional()
	})
	.strict()
	.refine((data) => Object.keys(data).length > 0, 'At least one field must be provided')
	.transform((data) => Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined)));
export type updateBookSchema = z.infer<typeof updateBookSchema>;
