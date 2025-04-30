import { User } from '../../users/entities/user.entity';

export class ClothingExample {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  accepted: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
} 