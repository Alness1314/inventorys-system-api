import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateApplicationInfoDto } from '../dto/create-application-info.dto';
import { UpdateApplicationInfoDto } from '../dto/update-application-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationInfo } from '../entities/application-info.entity';
import { plainToInstance } from 'class-transformer';
import { ResponseApplicationInfoDto } from '../dto/response-application-info.dto';

@Injectable()
export class ApplicationInfoService {
  private readonly logger = new Logger(ApplicationInfoService.name);

  constructor(
    @InjectRepository(ApplicationInfo)
    private readonly _applicationInfoRepository: Repository<ApplicationInfo>,
  ) {}

  async create(createApplicationInfoDto: CreateApplicationInfoDto) {
    const newAppInfo = this._applicationInfoRepository.create(
      createApplicationInfoDto,
    );
    let appInfo: ApplicationInfo;
    const findApp = await this._applicationInfoRepository.findOne({
      where: { applicationName: createApplicationInfoDto.applicationName },
    });
    if (findApp) {
      throw new BadRequestException(
        `Ya existe una aplicacion con ese nombre: ${createApplicationInfoDto.applicationName}.`,
      );
    }
    try {
      appInfo = await this._applicationInfoRepository.save(newAppInfo);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error: ' + error.message);
    }
    return plainToInstance(CreateApplicationInfoDto, appInfo);
  }

  async findAll() {
    const newAppInfoList = await this._applicationInfoRepository.find({
      where: { deleted: false },
    });
    return plainToInstance(ResponseApplicationInfoDto, newAppInfoList);
  }

  async findOne(id: string) {
    const appInfo: ApplicationInfo = await this.internalFindOne(id);
    return plainToInstance(ResponseApplicationInfoDto, appInfo);
  }

  async update(id: string, updateApplicationInfoDto: UpdateApplicationInfoDto) {
    const findApp = await this.internalFindOne(id);
    const updateApp = Object.assign(findApp, updateApplicationInfoDto);
    let responseUpdate: ApplicationInfo;
    try {
      responseUpdate = await this._applicationInfoRepository.save(updateApp);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
    }
    return plainToInstance(ResponseApplicationInfoDto, responseUpdate);
  }

  async remove(id: string) {
    const findApp = await this.internalFindOne(id);
    try {
      findApp.deleted = true;
      this._applicationInfoRepository.save(findApp);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
      throw new InternalServerErrorException(error.message);
    }
    return {
      msj: 'elemento ' + findApp.applicationName + ' eliminado.',
      status: true,
    };
  }

  async internalFindOne(id: string): Promise<ApplicationInfo> {
    const appInfo: ApplicationInfo =
      await this._applicationInfoRepository.findOne({
        where: { id: id, deleted: false },
      });
    if (!appInfo) {
      throw new NotFoundException(
        'application info con id: ' + id + ' no encontrado.',
      );
    }
    return appInfo;
  }
}
