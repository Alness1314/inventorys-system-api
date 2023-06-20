import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ServerInfoService } from '../service/server-info.service';
import { CreateServerInfoDto } from '../dto/create-server-info.dto';
import { UpdateServerInfoDto } from '../dto/update-server-info.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidProfiles } from 'src/auth/interfaces/valid-profiles';

@Controller('server-info')
@ApiTags('Server Info')
export class ServerInfoController {
  constructor(private readonly serverInfoService: ServerInfoService) {}

  @Post()
  @Auth(ValidProfiles.admin)
  create(@Body() createServerInfoDto: CreateServerInfoDto) {
    return this.serverInfoService.create(createServerInfoDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.serverInfoService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.serverInfoService.findOne(id);
  }

  @Put(':id')
  @Auth(ValidProfiles.admin)
  update(
    @Param('id') id: string,
    @Body() updateServerInfoDto: UpdateServerInfoDto,
  ) {
    return this.serverInfoService.update(id, updateServerInfoDto);
  }

  @Delete(':id')
  @Auth(ValidProfiles.admin)
  remove(@Param('id') id: string) {
    return this.serverInfoService.remove(id);
  }
}
