import { z } from 'zod';
import { Category } from '@/generated/prisma/enums';

const currentYear = new Date().getFullYear();

export const createBookSchema = z
	.object({
		title: z.string().min(1, 'Title is required'),
		author: z.string().min(1, 'Author is required'),
		year: z
			.number()
			.int()
			.min(1, 'Year invalid')
			.max(currentYear, `Year cannot be greater than ${currentYear}`),
		publisher: z.string().nullable().optional(),
		description: z.string().nullable().optional(),
		category: z.enum(Category),
		bookLocation: z.string().min(1, 'Book location is required').max(50, 'Book location invalid')
	})
	.transform((data) => ({
		...data,
		publisher: data.publisher ?? null,
		description: data.description ?? null
	}));
export type CreateBookSchema = z.infer<typeof createBookSchema>;

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
		category: z.enum(Category).optional(),
		bookLocation: z.string().min(1).max(50, 'Book location invalid').optional()
	})
	.strict()
	.refine((data) => Object.keys(data).length > 0, 'At least one field must be provided');
export type UpdateBookSchema = z.infer<typeof updateBookSchema>;
