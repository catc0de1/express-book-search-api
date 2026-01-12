import rateLimit from 'express-rate-limit';

export const authLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 2, // 2 request per IP
	handler: (_req, res) => {
		res.status(429).json({
			message: 'Too many request'
		});
	},
	standardHeaders: true,
	legacyHeaders: true
});
