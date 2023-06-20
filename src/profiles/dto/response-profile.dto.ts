import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/common.response.dto';

export class ResponseProfileDto extends CommonResponseDto {
  @ApiProperty()
  name: string;
}
