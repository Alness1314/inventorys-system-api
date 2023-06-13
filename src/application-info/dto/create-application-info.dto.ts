import { ApiProperty } from '@nestjs/swagger';
import { IsIP, IsString } from 'class-validator';

export class CreateApplicationInfoDto {
  @IsString()
  @ApiProperty()
  applicationName: string;

  @IsString()
  @ApiProperty()
  defaultPort: string;

  @IsString()
  @ApiProperty()
  modifiedPort: string;

  @IsString()
  @IsIP()
  @ApiProperty()
  externalIp: string;

  @IsString()
  @ApiProperty()
  description: string;
}
