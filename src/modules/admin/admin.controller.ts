import { AdminService } from './admin.service';

import type { Request, Response } from 'express';

const adminService = new AdminService();

export class AdminController {
	async login(req: Request, res: Response) {
		const { password } = req.body;
		const pepper = process.env.PASSWORD_PEPPER;

		if (!pepper) {
			return res.status(500).json({
				message: 'Internal server error'
			});
		}

		const isValid = await adminService.validatePassword(password, pepper);

		if (!isValid) {
			return res.status(401).json({
				message: 'Invalid password'
			});
		}

		req.session.admin = true;

		return res.status(200).json({
			message: 'Login successfully'
		});
	}

	async logout(req: Request, res: Response) {
		req.session.destroy((err) => {
			if (err) {
				console.error(err);
				return res.status(500).json({
					message: 'Logout failed'
				});
			}

			res.clearCookie('book_api_session');

			return res.status(200).json({
				message: 'Logout successfully'
			});
		});
	}
}
