import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDto } from '../dto/response-user.dto';
import { Profile } from 'src/profiles/entities/profile.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly _userRespository: Repository<User>,
    @InjectRepository(Profile)
    private readonly _profileRespository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this._userRespository.create(createUserDto);
    let user: User;

    const list: Profile[] = [];
    for (const id of createUserDto.profilesId) {
      const temp = await this._profileRespository.findOneBy({ id: id });
      if (!temp) {
        throw new NotFoundException('role not found');
      }
      console.log(JSON.stringify(temp));
      list.push(temp);
    }
    try {
      newUser.profiles = list;
      user = await this._userRespository.save(newUser);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseUserDto, user);
  }

  async findAll() {
    const listUser = await this._userRespository.find({
      relations: ['profiles'],
      where: { deleted: false },
    });
    return plainToInstance(ResponseUserDto, listUser);
  }

  async findOne(id: string) {
    const user = await this.internalFindOne(id);
    return plainToInstance(ResponseUserDto, user);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  private handleDBExceptions(error: any) {
    this.logger.error(error);
    if (error.code === 'ER_DUP_ENTRY') {
      throw new ConflictException('Duplicate entry in database');
    }
    console.log(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  private async internalFindOne(id: string) {
    const user = await this._userRespository.findOne({
      relations: ['profiles'],
      where: { id: id, deleted: false },
    });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this._userRespository.findOne({
      relations: ['profiles'],
      where: { email: email },
    });
    if (!user) {
      this.logger.warn(`User ${email} not found`);
      return null;
    }
    return user;
  }
}
