import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class WeatherDto {
@ApiProperty({
    description: 'City',
    example: 'Quito',
})
  @IsString()
  city: string;

  }
