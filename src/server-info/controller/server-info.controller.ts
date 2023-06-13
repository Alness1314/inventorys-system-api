import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServerInfoService } from '../service/server-info.service';
import { CreateServerInfoDto } from '../dto/create-server-info.dto';
import { UpdateServerInfoDto } from '../dto/update-server-info.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('server-info')
@ApiTags('Server Info')
export class ServerInfoController {
  constructor(private readonly serverInfoService: ServerInfoService) {}

  @Post()
  create(@Body() createServerInfoDto: CreateServerInfoDto) {
    return this.serverInfoService.create(createServerInfoDto);
  }

  @Get()
  findAll() {
    return this.serverInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serverInfoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateServerInfoDto: UpdateServerInfoDto,
  ) {
    return this.serverInfoService.update(id, updateServerInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverInfoService.remove(id);
  }
}
