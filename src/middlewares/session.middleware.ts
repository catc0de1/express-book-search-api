import session from 'express-session';

import type { RequestHandler } from 'express';

const SESSION_SECRET = process.env.SESSION_SECRET;

if (!SESSION_SECRET) {
	throw new Error('SESSION_SECRET missing');
}

export const sessionMiddleware: RequestHandler = session({
	name: 'book_api_session',
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		httpOnly: true,
		sameSite: 'strict',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 1000 * 60 * 60 * 18 // 18 hour
	}
});
