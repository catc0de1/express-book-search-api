import { Prisma } from '@/generated/prisma/client';
import { BookLocationService } from './book-location.service';

import type { Request, Response } from 'express';

const bookLocationService = new BookLocationService();

export class BookLocationController {
	async getAll(_req: Request, res: Response) {
		const bookLocations = await bookLocationService.getAll();

		res.status(200).json({ data: bookLocations });
	}

	async create(req: Request, res: Response) {
		const bookLocation = await bookLocationService.create(req.body);

		res.status(201).json({
			message: 'Book location created successfully',
			data: bookLocation
		});
	}

	async update(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);

			if (Number.isNaN(id)) {
				return res.status(400).json({ message: 'Invalid book location ID' });
			}

			const bookLocation = await bookLocationService.update(id, req.body);

			return res.json({
				message: 'Book location updated successfully',
				data: bookLocation
			});
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
				return res.status(404).json({
					message: 'Book location not found'
				});
			}

			console.error(err);
			return res.status(500).json({
				message: 'Internal server error'
			});
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);

			if (Number.isNaN(id)) {
				return res.status(400).json({ message: 'Invalid book location ID' });
			}

			const bookLocation = await bookLocationService.delete(id);

			return res.json({
				message: 'Book location deleted successfully',
				data: bookLocation
			});
		} catch (err) {
			if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
				return res.status(404).json({
					message: 'Book location not found'
				});
			}

			console.error(err);
			return res.status(500).json({
				message: 'Internal server error'
			});
		}
	}
}
