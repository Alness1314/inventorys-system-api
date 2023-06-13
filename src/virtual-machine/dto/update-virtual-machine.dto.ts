import { PartialType } from '@nestjs/swagger';
import { CreateVirtualMachineDto } from './create-virtual-machine.dto';

export class UpdateVirtualMachineDto extends PartialType(
  CreateVirtualMachineDto,
) {}
