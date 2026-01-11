import { prisma } from './prisma';

export const checkPrismaHealth = async () => {
	try {
		await prisma.$queryRaw`SELECT 1`;
		return true;
	} catch {
		return false;
	}
};
