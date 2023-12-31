import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  Param,
  //Delete,
} from '@nestjs/common';
import { ProfilesService } from '../service/profiles.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
//import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidProfiles } from 'src/auth/interfaces/valid-profiles';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('profiles')
@ApiTags('Profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @Auth(ValidProfiles.admin)
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  @Auth()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @Auth()
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne(id);
  }

  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilesService.remove(id);
  }*/
}
