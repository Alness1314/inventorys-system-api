import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ConfigKeys } from 'src/utils/keys/configs.keys';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interfaces/payload.interface';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    //private readonly _userService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly _configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _configService.get<string>(ConfigKeys.JWT_SECRET),
    });
  }

  async validate(payload: JwtPayload) {
    const { id } = payload;
    const user = await this.userRepository.findOne({
      relations: ['profiles'],
      where: { id: id },
    });
    if (!user) {
      throw new UnauthorizedException('Token not valid');
    }
    if (user.deleted) {
      throw new UnauthorizedException('User is deleted, talk with an admin');
    }

    this.logger.debug('User: ' + JSON.stringify(user));
    return user;
  }
}
