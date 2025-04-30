import { User } from '../../users/entities/user.entity';

export class Partner {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
} 