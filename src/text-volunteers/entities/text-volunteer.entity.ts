import { User } from '../../users/entities/user.entity';

export class TextVolunteer {
  id: string;
  imageUrl: string | null;
  textContent: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
} 