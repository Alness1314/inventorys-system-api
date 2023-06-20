/* eslint-disable prefer-const */
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from 'src/utils/keys/configs.keys';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../service/users.service';
import { ProfilesService } from 'src/profiles/service/profiles.service';
import { ValidProfiles } from 'src/auth/interfaces/valid-profiles';

export const setDefaultUser = async (
  _configService: ConfigService,
  _userService: UsersService,
  _profileService: ProfilesService,
) => {
  const defaultUser = await _userService.findByEmail(
    _configService.get<string>(ConfigKeys.DEFAULT_EMAIL),
  );

  if (!defaultUser) {
    const newUser = new CreateUserDto();
    newUser.email = _configService.get<string>(ConfigKeys.DEFAULT_EMAIL);
    newUser.password = _configService.get<string>(ConfigKeys.DEFAULT_PASSWORD);

    const profile = await _profileService.findByName(ValidProfiles.admin);

    newUser.profilesId = [profile.id];
    console.log(JSON.stringify(newUser));
    const adminUser = await _userService.create(newUser);
    console.log(JSON.stringify(adminUser));
    return adminUser;
  }

  console.warn('DEFAULT USER: ' + JSON.stringify(defaultUser));
};
