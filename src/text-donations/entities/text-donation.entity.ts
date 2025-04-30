import { User } from '../../users/entities/user.entity';

export class TextDonation {
  id: string;
  messageSchedule: string;
  messageAdvertising: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user?: User;
} 