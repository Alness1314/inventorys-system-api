import { ResponseVirtualMachineDto } from './../../virtual-machine/dto/response-virtual-machine.dto';
import { ResponseHardwareInfo } from './response-hardware-info.dto';

export class ResponseServerInfo {
  id: string;
  serverName: string;
  description: string;
  serialNumber: string;
  operatingSystem: string;
  status: boolean;
  serverIp: string;
  externalIp: string;
  lastMaintenance: Date;
  dateCreate: Date;
  deleted: boolean;
  hardwareInfo: ResponseHardwareInfo;
  virtualMachines: ResponseVirtualMachineDto;
}
