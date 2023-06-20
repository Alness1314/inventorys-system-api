import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ResponseProfileDto } from '../dto/response-profile.dto';

@Injectable()
export class ProfilesService {
  private readonly logger = new Logger('ProfilesService');

  constructor(
    @InjectRepository(Profile)
    private readonly _profileRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const newProfile = this._profileRepository.create(createProfileDto);
    let profile: Profile;
    try {
      profile = await this._profileRepository.save(newProfile);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return plainToInstance(ResponseProfileDto, profile);
  }

  async findAll() {
    const profiles = await this._profileRepository.find({
      where: { deleted: false },
    });
    return plainToInstance(ResponseProfileDto, profiles);
  }

  async findOne(id: string) {
    const profile = await this.internalFindOne(id);
    return plainToInstance(ResponseProfileDto, profile);
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
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
    const rol = await this._profileRepository.findOneBy({ id: id });
    if (!rol) {
      throw new NotFoundException(`Role with id:${id} not found`);
    }
    return rol;
  }

  async findByName(name: string) {
    const rol = await this._profileRepository.findOneBy({ name: name });
    if (!rol) {
      this.logger.warn(`Profile with id:${name} not found`);
    }
    return rol;
  }
}
