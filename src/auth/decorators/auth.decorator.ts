import { UseGuards, applyDecorators } from '@nestjs/common';
import { ValidProfiles } from '../interfaces/valid-profiles';
import { AuthGuard } from '@nestjs/passport';
import { ProfileProtected } from './profile-protected.decorator';
import { UserProfileGuard } from '../guards/user-profile.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(...profiles: ValidProfiles[]) {
  return applyDecorators(
    ProfileProtected(...profiles),
    UseGuards(AuthGuard(), UserProfileGuard),
    ApiBearerAuth(),
  );
}
