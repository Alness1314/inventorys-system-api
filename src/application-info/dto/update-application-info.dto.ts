import { PartialType } from '@nestjs/swagger';
import { CreateApplicationInfoDto } from './create-application-info.dto';

export class UpdateApplicationInfoDto extends PartialType(
  CreateApplicationInfoDto,
) {}
