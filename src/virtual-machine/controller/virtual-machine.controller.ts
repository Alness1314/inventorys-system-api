import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { VirtualMachineService } from '../service/virtual-machine.service';
import { CreateVirtualMachineDto } from '../dto/create-virtual-machine.dto';
import { UpdateVirtualMachineDto } from '../dto/update-virtual-machine.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidProfiles } from 'src/auth/interfaces/valid-profiles';

@Controller('virtual-machine')
@ApiTags('Virtual Machine')
export class VirtualMachineController {
  constructor(private readonly virtualMachineService: VirtualMachineService) {}

  @Post()
  @Auth(ValidProfiles.admin)
  create(@Body() createVirtualMachineDto: CreateVirtualMachineDto) {
    return this.virtualMachineService.create(createVirtualMachineDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.virtualMachineService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.virtualMachineService.findOne(id);
  }

  @Put(':id')
  @Auth(ValidProfiles.admin)
  update(
    @Param('id') id: string,
    @Body() updateVirtualMachineDto: UpdateVirtualMachineDto,
  ) {
    return this.virtualMachineService.update(id, updateVirtualMachineDto);
  }

  @Delete(':id')
  @Auth(ValidProfiles.admin)
  remove(@Param('id') id: string) {
    return this.virtualMachineService.remove(id);
  }
}
