import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export class AdminService {
	async validatePassword(password: string, pepper: string) {
		const admin = await prisma.admin.findFirst();

		if (!admin) {
			return false;
		}

		return bcrypt.compare(password + pepper, admin.password);
	}
}
