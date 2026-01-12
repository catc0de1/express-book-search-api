import { ZodError } from 'zod';

import type { ZodType } from 'zod';
import type { Request, Response, NextFunction } from 'express';

export const validate = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
	try {
		req.body = schema.parse(req.body);
		next();
	} catch (err) {
		if (err instanceof ZodError) {
			return res.status(400).json({
				message: 'Validation error',
				errors: err.issues
			});
		}

		next(err);
	}
};
