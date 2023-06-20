import { Reflector } from '@nestjs/core';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_PROFILES } from '../decorators/profile-protected.decorator';

@Injectable()
export class UserProfileGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validProfles: string[] = this.reflector.get(
      META_PROFILES,
      context.getHandler(),
    );

    if (!validProfles) return true;

    if (validProfles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    //console.log(validProfles);
    //console.log(user);

    if (!user) throw new BadRequestException('User not found');
    //console.log({ userProfiles: user.profiles });

    for (const profile of user.profiles) {
      if (validProfles.includes(profile.name)) return true;
    }

    throw new ForbiddenException(`User ${user.email} need a valid profile. `);
  }
}
