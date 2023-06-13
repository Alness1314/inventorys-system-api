import { plainToInstance } from 'class-transformer';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateVirtualMachineDto } from '../dto/create-virtual-machine.dto';
import { UpdateVirtualMachineDto } from '../dto/update-virtual-machine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VirtualMachine } from '../entities/virtual-machine.entity';
//import { ApplicationInfo } from 'src/application-info/entities/application-info.entity';
import { ResponseVirtualMachineDto } from '../dto/response-virtual-machine.dto';
import { ApplicationInfoService } from 'src/application-info/service/application-info.service';

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
      if (!valuetem) {
        throw new BadRequestException(
          `No se encontro aplicacion con id: ${valuetem}.`,
        );
      }
      listApplication.push(valuetem);
    }

    newVmachine.applicationInfo = listApplication;

    try {
      virtualMachine = await this._vmachineRepository.save(newVmachine);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Error: ' + error.message);
    }
    return plainToInstance(ResponseVirtualMachineDto, virtualMachine);
  }

  async findAll() {
    const newVMachineList = await this._vmachineRepository.find({
      where: { deleted: false },
      relations: { applicationInfo: true },
    });

    for (const vMachine of newVMachineList) {
      vMachine.applicationInfo = vMachine.applicationInfo.filter(
        (app) => app.deleted === false,
      );
    }

    return plainToInstance(ResponseVirtualMachineDto, newVMachineList);
  }

  async findOne(id: string) {
    const vMachine = await this.internalFindOne(id);
    return plainToInstance(ResponseVirtualMachineDto, vMachine);
  }

  update(id: string, updateVirtualMachineDto: UpdateVirtualMachineDto) {
    this.logger.log(JSON.stringify(updateVirtualMachineDto));
    return `This action updates a #${id} virtualMachine`;
  }

  remove(id: string) {
    return `This action removes a #${id} virtualMachine`;
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
