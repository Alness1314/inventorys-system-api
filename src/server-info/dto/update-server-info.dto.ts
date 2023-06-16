import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateServerInfoDto } from './create-server-info.dto';

export class UpdateServerInfoDto extends PartialType(
  OmitType(CreateServerInfoDto, ['virtualMachines'] as const),
) {}
