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

@Controller('virtual-machine')
@ApiTags('Virtual Machine')
export class VirtualMachineController {
  constructor(private readonly virtualMachineService: VirtualMachineService) {}

  @Post()
  create(@Body() createVirtualMachineDto: CreateVirtualMachineDto) {
    return this.virtualMachineService.create(createVirtualMachineDto);
  }

  @Get()
  findAll() {
    return this.virtualMachineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.virtualMachineService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateVirtualMachineDto: UpdateVirtualMachineDto,
  ) {
    return this.virtualMachineService.update(id, updateVirtualMachineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.virtualMachineService.remove(id);
  }
}
