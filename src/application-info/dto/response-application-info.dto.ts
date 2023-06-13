import { CommonResponseDto } from 'src/common/common.response.dto';

export class ResponseApplicationInfoDto extends CommonResponseDto {
  applicationName: string;
  defaultPort: string;
  modifiedPort: string;
  externalIp: string;
  description: string;
}
