import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHardwareInfoDto {
  @IsString()
  @ApiProperty()
  processor: string;

  @IsString()
  @ApiProperty()
  ramMemory: string;

  @IsString()
  @ApiProperty()
  storage: string;

  @IsString()
  @ApiProperty()
  networkAdapter: string;

  @IsString()
  @ApiProperty()
  graphicsCard: string;

  @IsString()
  @ApiProperty()
  description: string;
}
