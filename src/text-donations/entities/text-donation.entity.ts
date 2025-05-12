import { User } from '../../users/entities/user.entity';

export class TextDonation {
  id: string;
  messageSchedule: string;
  messageAdvertising: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
} 