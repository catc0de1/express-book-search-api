import { Category } from '@/generated/prisma/enums';

export class CategoryService {
	getAll() {
		return Object.values(Category);
	}
}
