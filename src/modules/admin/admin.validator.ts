import { z } from 'zod';

export const loginSchema = z.object({
	password: z.string().min(1, 'Password is required')
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const changePasswordSchema = z.object({
	newPassword: z
		.string()
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
			'Password must contain at least one uppercase letter, one lowercase letter, and one digit'
		)
		.min(6, 'Password must be at least 6 characters long')
});
export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
