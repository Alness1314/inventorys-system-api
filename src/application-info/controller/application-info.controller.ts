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
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidProfiles } from 'src/auth/interfaces/valid-profiles';

@ApiTags('Application Info')
@Controller('application-info')
export class ApplicationInfoController {
  constructor(
    private readonly applicationInfoService: ApplicationInfoService,
  ) {}

  @Post()
  @Auth(ValidProfiles.admin)
  create(@Body() createApplicationInfoDto: CreateApplicationInfoDto) {
    return this.applicationInfoService.create(createApplicationInfoDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.applicationInfoService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.applicationInfoService.findOne(id);
  }

  @Put(':id')
  @Auth(ValidProfiles.admin)
  update(
    @Param('id') id: string,
    @Body() updateApplicationInfoDto: UpdateApplicationInfoDto,
  ) {
    return this.applicationInfoService.update(id, updateApplicationInfoDto);
  }

  @Delete(':id')
  @Auth(ValidProfiles.admin)
  remove(@Param('id') id: string) {
    return this.applicationInfoService.remove(id);
  }
}
