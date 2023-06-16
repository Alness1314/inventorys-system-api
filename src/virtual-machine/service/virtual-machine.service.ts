import { plainToInstance } from 'class-transformer';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateVirtualMachineDto } from '../dto/create-virtual-machine.dto';
import { UpdateVirtualMachineDto } from '../dto/update-virtual-machine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VirtualMachine } from '../entities/virtual-machine.entity';
//import { ApplicationInfo } from 'src/application-info/entities/application-info.entity';
import { ResponseVirtualMachineDto } from '../dto/response-virtual-machine.dto';
import { ApplicationInfoService } from 'src/application-info/service/application-info.service';
import { filterData } from 'src/utils/utils.functions';
import { ApplicationInfo } from 'src/application-info/entities/application-info.entity';

@Injectable()
export class VirtualMachineService {
  private readonly logger = new Logger(VirtualMachineService.name);

  constructor(
    @InjectRepository(VirtualMachine)
    private readonly _vmachineRepository: Repository<VirtualMachine>,
    //@InjectRepository(ApplicationInfo)
    //private readonly _appInfoRepository: Repository<ApplicationInfo>,
    private readonly _appInfoService: ApplicationInfoService,
  ) {}

  async create(createVirtualMachineDto: CreateVirtualMachineDto) {
    const newVmachine = this._vmachineRepository.create(
      createVirtualMachineDto,
    );
    let virtualMachine: VirtualMachine;
    //APPLICATION
    const listApplication = [];
    for (const value of createVirtualMachineDto.applicationInfoId) {
      const valuetem = await this._appInfoService.findOne(value);
      listApplication.push(valuetem);
    }

    newVmachine.applicationInfo = listApplication;
    try {
      virtualMachine = await this._vmachineRepository.save(newVmachine);
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException('Error: ' + error.message);
    }
    return plainToInstance(ResponseVirtualMachineDto, virtualMachine);
  }

  async findAll() {
    const newVMachineList: VirtualMachine[] =
      await this._vmachineRepository.find({
        where: {
          deleted: false,
        },
        relations: ['applicationInfo'],
      });

    //filtramos las aplicaciones borradas
    newVMachineList.forEach((virtualMach) => {
      virtualMach.applicationInfo = filterData(
        virtualMach.applicationInfo,
        'deleted',
        false,
      );
    });
    //return queryBuilder;
    return plainToInstance(ResponseVirtualMachineDto, newVMachineList);
  }

  async findOne(id: string) {
    const vMachine = await this.internalFindOne(id);
    return plainToInstance(ResponseVirtualMachineDto, vMachine);
  }

  async update(id: string, updateVirtualMachineDto: UpdateVirtualMachineDto) {
    const findVMachine = await this.internalFindOne(id);
    const updateVMachine = Object.assign(findVMachine, updateVirtualMachineDto);
    let responseUpdate: VirtualMachine;
    //nuevas APPLICATIONES a añadir
    for (const value of updateVirtualMachineDto.applicationInfoId) {
      const valuetem = await this._appInfoService.findOne(value);
      updateVMachine.applicationInfo.push(
        plainToInstance(ApplicationInfo, valuetem),
      );
    }
    try {
      responseUpdate = await this._vmachineRepository.save(updateVMachine);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
    }

    return plainToInstance(ResponseVirtualMachineDto, responseUpdate);
  }

  async remove(id: string) {
    const findVMachine = await this.internalFindOne(id);
    let responseUpdate: VirtualMachine;
    findVMachine.deleted = true;
    try {
      responseUpdate = await this._vmachineRepository.save(findVMachine);
    } catch (error) {
      this.logger.error('Error: ' + error.message);
    }
    return {
      msj: 'elemento ' + responseUpdate.nameVM + ' eliminado.',
      status: true,
    };
  }

  async internalFindOne(id: string): Promise<VirtualMachine> {
    const vMachine = await this._vmachineRepository.findOne({
      relations: ['applicationInfo'],
      where: { id: id, deleted: false },
    });
    if (!vMachine) {
      throw new BadRequestException(`No se encontro aplicacion con id: ${id}.`);
    }
    vMachine.applicationInfo = vMachine.applicationInfo.filter(
      (app) => app.deleted === false,
    );
    return vMachine;
  }
}
