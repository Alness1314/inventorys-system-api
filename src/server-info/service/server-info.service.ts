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
import { filterData } from 'src/utils/utils.functions';

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

    newServers.forEach((server) => {
      server.virtualMachines = filterData(
        server.virtualMachines,
        'deleted',
        false,
      );

      server.virtualMachines.forEach((vm) => {
        vm.applicationInfo = filterData(vm.applicationInfo, 'deleted', false);
      });
    });

    return plainToInstance(ResponseServerInfo, newServers);
  }

  async findOne(id: string) {
    const server: ServerInfo = await this.internalFindOne(id);
    return plainToInstance(ResponseServerInfo, server);
  }

  async update(id: string, updateServerInfoDto: UpdateServerInfoDto) {
    const findServer = await this.internalFindOne(id);

    const updateServer = this._serverRepository.merge(
      findServer,
      updateServerInfoDto,
    );
    let responseUpdate: ServerInfo;

    try {
      responseUpdate = await this._serverRepository.save(updateServer);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error: ' + error.message);
    }
    return plainToInstance(ResponseServerInfo, responseUpdate);
  }

  async remove(id: string) {
    const findServer = await this.internalFindOne(id);
    findServer.deleted = true;
    let responseUpdate: ServerInfo;

    try {
      responseUpdate = await this._serverRepository.save(findServer);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error: ' + error.message);
    }
    return {
      msj: 'elemento ' + responseUpdate.serverName + ' eliminado.',
      status: true,
    };
  }

  async internalFindOne(id: string) {
    const server: ServerInfo = await this._serverRepository.findOne({
      relations: { hardwareInfo: true, virtualMachines: true },
      where: { id: id, deleted: false },
    });
    if (!server) {
      throw new NotFoundException('server with id: ' + id + ' not found');
    }

    server.virtualMachines = filterData(
      server.virtualMachines,
      'deleted',
      false,
    );

    server.virtualMachines.forEach((vm) => {
      vm.applicationInfo = filterData(vm.applicationInfo, 'deleted', false);
    });

    return server;
  }
}
