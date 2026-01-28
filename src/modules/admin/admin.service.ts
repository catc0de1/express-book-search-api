import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

const PASSWORD_PEPPER = process.env.PASSWORD_PEPPER;
const PASSWORD_SALT_ROUNDS = Number(process.env.PASSWORD_SALTROUNDS);

export class AdminService {
	async validatePassword(password: string) {
		if (!PASSWORD_PEPPER) {
			throw new Error('PASSWORD_PEPPER missing');
		}

		const admin = await prisma.admin.findFirst();

		if (!admin) {
			return false;
		}

		return bcrypt.compare(password + PASSWORD_PEPPER, admin.password);
	}

	async changePassword(newPassword: string) {
		if (!PASSWORD_PEPPER) {
			throw new Error('PASSWORD_PEPPER missing');
		}

		const hashedPassword = await bcrypt.hash(newPassword + PASSWORD_PEPPER, PASSWORD_SALT_ROUNDS);

		const admin = await prisma.admin.findFirst();

		if (!admin) {
			throw new Error('Admin user not found');
		}

		await prisma.admin.update({
			where: { id: admin.id },
			data: { password: hashedPassword }
		});

		return;
	}
}
