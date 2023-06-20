import { ConfigService } from '@nestjs/config';
import { ValidProfiles } from 'src/auth/interfaces/valid-profiles';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';
import { ProfilesService } from 'src/profiles/service/profiles.service';

export const setDefaultProfiles = async (
  _configService: ConfigService,
  _profileService: ProfilesService,
) => {
  const defaultProfile = await _profileService.findByName(ValidProfiles.admin);

  if (!defaultProfile) {
    const newUser = new CreateProfileDto();
    newUser.name = ValidProfiles.admin;
    console.log(JSON.stringify(newUser));
    const adminUser = await _profileService.create(newUser);
    console.log(JSON.stringify(adminUser));
    return adminUser;
  }

  console.warn('DEFAULT PROFILE: ' + JSON.stringify(defaultProfile));
};
