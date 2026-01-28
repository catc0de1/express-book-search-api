import { z } from 'zod';

export const createBookLocationSchema = z.object({
	name: z.string().min(1, 'Book location is required').max(50, 'Book location invalid')
});
export type CreateBookLocationSchema = z.infer<typeof createBookLocationSchema>;

export const updateBookLocationSchema = createBookLocationSchema;
export type UpdateBookLocationSchema = CreateBookLocationSchema;
