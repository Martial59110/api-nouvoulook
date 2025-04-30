import { User } from '../../users/entities/user.entity';

export class TextVolunteer {
  id: string;
  imageUrl: string;
  textContent: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
} 