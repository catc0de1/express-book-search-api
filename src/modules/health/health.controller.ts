import { checkPrismaHealth } from '@/lib/prisma-health';

import type { Request, Response } from 'express';

export class HealthController {
	apiCheck(_req: Request, res: Response) {
		res.json({
			status: 'ok'
		});
	}

	async dbCheck(_req: Request, res: Response) {
		const dbHealthy = await checkPrismaHealth();

		res.status(dbHealthy ? 200 : 503).json({
			status: dbHealthy ? 'ok' : 'error',
			database: dbHealthy ? 'connected' : 'disconnected'
		});
	}
}
