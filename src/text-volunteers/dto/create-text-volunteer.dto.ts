import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTextVolunteerDto {
  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  textContent: string;
} 