import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateServerInfoDto } from '../dto/create-server-info.dto';
import { UpdateServerInfoDto } from '../dto/update-server-info.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServerInfo } from '../entities/server-info.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ResponseServerInfo } from '../dto/response-server-info.dto';
import { VirtualMachineService } from 'src/virtual-machine/service/virtual-machine.service';

@Injectable()
export class ServerInfoService {
  private readonly logger = new Logger(ServerInfoService.name);

  constructor(
    @InjectRepository(ServerInfo)
    private readonly _serverRepository: Repository<ServerInfo>,
    private readonly _vmachineService: VirtualMachineService,
  ) {}

  async create(createServerInfoDto: CreateServerInfoDto) {
    const newServer = this._serverRepository.create(createServerInfoDto);
    let server: ServerInfo;
    const listVirtualMachines = [];
    for (const virtualMachine of createServerInfoDto.virtualMachines) {
      const vmItem = await this._vmachineService.create(virtualMachine);
      listVirtualMachines.push(vmItem);
    }
    newServer.virtualMachines = listVirtualMachines;
    try {
      server = await this._serverRepository.save(newServer);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error: ' + error.message);
    }
    return plainToInstance(ResponseServerInfo, server);
  }

  async findAll() {
    const newServers = await this._serverRepository.find({
      where: { deleted: false },
      relations: { hardwareInfo: true, virtualMachines: true },
    });

    return plainToInstance(ResponseServerInfo, newServers);
  }

  async findOne(id: string) {
    const server: ServerInfo = await this._serverRepository.findOne({
      relations: { hardwareInfo: true, virtualMachines: true },
      where: { id: id },
    });
    if (!server) {
      throw new NotFoundException('server with id:' + id + ' not found');
    }
    return plainToInstance(ResponseServerInfo, server);
  }

  update(id: string, updateServerInfoDto: UpdateServerInfoDto) {
    this.logger.log(JSON.stringify(updateServerInfoDto));
    return `This action updates a #${id} serverInfo`;
  }

  remove(id: string) {
    return `This action removes a #${id} serverInfo`;
  }
}
