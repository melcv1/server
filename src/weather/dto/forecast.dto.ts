import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ForecastDto {
@ApiProperty({
    description: 'City',
    example: 'Quito',
})
  @IsString()
  city: string;

  @ApiProperty({
    description: 'Fecha',
    example: '2024-01-13',
})
  date: string;  
}
