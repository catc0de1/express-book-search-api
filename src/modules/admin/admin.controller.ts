import { AdminService } from './admin.service';

import type { Request, Response } from 'express';

const adminService = new AdminService();

export class AdminController {
	async login(req: Request, res: Response) {
		if (req.session.admin) {
			return res.status(400).json({
				message: 'Already logged in'
			});
		}

		const { password } = req.body;

		const isValid = await adminService.validatePassword(password);

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
		if (!req.session.admin) {
			return res.status(401).json({
				message: 'Unauthenticated'
			});
		}

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

	async changePassword(req: Request, res: Response) {
		try {
			await adminService.changePassword(req.body.newPassword);

			return res.status(200).json({
				message: 'Password changed successfully'
			});
		} catch (error) {
			console.error(error);

			return res.status(500).json({
				message: 'Failed to change password'
			});
		}
	}
}
