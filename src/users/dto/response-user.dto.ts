import { ApiProperty } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/common/common.response.dto';
import { Profile } from 'src/profiles/entities/profile.entity';

export class ResponseUserDto extends CommonResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  profiles: Profile[];
}
