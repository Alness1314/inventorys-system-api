import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtPayload } from '../interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    //private readonly _userService: UsersService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this._userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    //console.log("User: "+JSON.stringify(user))
    if (!user) {
      throw new UnauthorizedException(
        'Please check your credentials, password or incorrect email',
      );
    }

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(
        'Please check your credentials, password or incorrect email',
      );

    //const user: User = await this._userService.findUserByEmailAndPassword(loginUserDto);

    //TODO: return jwt token
    return {
      ...user,
      token: this.generateJwtToken({ id: user.id, email: user.email }),
    };
  }

  async refreshToken(user: User) {
    //TODO: return jwt token
    return {
      ...user,
      token: this.generateJwtToken({ id: user.id, email: user.email }),
    };
  }

  private generateJwtToken(payload: JwtPayload) {
    const token = this._jwtService.sign(payload);
    return token;
  }
}
