import { User } from '../../users/entities/user.entity';

export class News {
  id: string;
  title: string;
  textContent: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
} 