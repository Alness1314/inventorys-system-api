import { ResponseApplicationInfoDto } from 'src/application-info/dto/response-application-info.dto';

export class ResponseVirtualMachineDto {
  id: string;
  nameVM: string;
  description: string;
  ipVM: string;
  externalIp: string;
  applicationInfo: ResponseApplicationInfoDto[];
  dateCreate: Date;
  deleted: boolean;
}
