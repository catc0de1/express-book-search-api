import 'dotenv/config';
import app from './app';
import { prisma } from './lib/prisma';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
	try {
		await prisma.$connect();
		console.log('\nDatabase connected');

		app.listen(PORT, () => {
			console.log(`\nServer running on http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error('Failed on running:', err);
		process.exit(1);
	}
}

const shutdown = async () => {
	console.log('\nShutting down...');
	try {
		await prisma.$disconnect();
		console.log('Database Disconnected\n');
	} finally {
		process.exit(0);
	}
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

bootstrap();
