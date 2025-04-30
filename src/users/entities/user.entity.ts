import { Partner } from '../../partners/entities/partner.entity';
import { News } from '../../news/entities/news.entity';
import { TextDonation } from '../../text-donations/entities/text-donation.entity';
import { TextVolunteer } from '../../text-volunteers/entities/text-volunteer.entity';
import { ClothingExample } from '../../clothing-examples/entities/clothing-example.entity';

export class User {
  id: string;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  partner?: Partner;
  news?: News[];
  textDonations?: TextDonation[];
  textVolunteer?: TextVolunteer;
  clothingExamples?: ClothingExample[];
} 