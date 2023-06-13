import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreateVirtualMachineDto {
  @IsString()
  @ApiProperty()
  nameVM: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  ipVM: string;

  @IsString()
  @ApiProperty()
  externalIp: string;

  @IsArray()
  @ApiProperty()
  applicationInfoId: string[];
}
