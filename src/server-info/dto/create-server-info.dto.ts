import {
  IsBoolean,
  IsDateString,
  IsIP,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateHardwareInfoDto } from './create-hardware-info.dto';
import { Transform, Type } from 'class-transformer';
import { setTimeZone } from 'src/utils/utils.functions';
import { ApiProperty } from '@nestjs/swagger';
import { CreateVirtualMachineDto } from 'src/virtual-machine/dto/create-virtual-machine.dto';

export class CreateServerInfoDto {
  @ApiProperty()
  @IsString()
  serverName: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  serialNumber: string;

  @IsString()
  @ApiProperty()
  operatingSystem: string;

  @IsBoolean()
  @ApiProperty()
  status: boolean;

  @IsString()
  @IsIP()
  @ApiProperty()
  serverIp: string;

  @IsString()
  @ApiProperty()
  externalIp: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty()
  @Transform(setTimeZone, { toClassOnly: true })
  lastMaintenance: string;

  @ApiProperty()
  @IsOptional()
  hardwareInfo: CreateHardwareInfoDto;

  @IsOptional()
  @ApiProperty()
  @Type(() => CreateVirtualMachineDto)
  virtualMachines: CreateVirtualMachineDto[];
}
