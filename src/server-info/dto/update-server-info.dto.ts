import { PartialType } from '@nestjs/mapped-types';
import { CreateServerInfoDto } from './create-server-info.dto';

export class UpdateServerInfoDto extends PartialType(CreateServerInfoDto) {}
