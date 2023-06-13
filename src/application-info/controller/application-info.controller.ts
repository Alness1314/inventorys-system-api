import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApplicationInfoService } from '../service/application-info.service';
import { CreateApplicationInfoDto } from '../dto/create-application-info.dto';
import { UpdateApplicationInfoDto } from '../dto/update-application-info.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Application Info')
@Controller('application-info')
export class ApplicationInfoController {
  constructor(
    private readonly applicationInfoService: ApplicationInfoService,
  ) {}

  @Post()
  create(@Body() createApplicationInfoDto: CreateApplicationInfoDto) {
    return this.applicationInfoService.create(createApplicationInfoDto);
  }

  @Get()
  findAll() {
    return this.applicationInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationInfoService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicationInfoDto: UpdateApplicationInfoDto,
  ) {
    return this.applicationInfoService.update(id, updateApplicationInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationInfoService.remove(id);
  }
}
