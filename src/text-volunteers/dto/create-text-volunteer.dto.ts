import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateTextVolunteerDto {
  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  textContent: string;
} 