import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { setDateLocal } from 'src/utils/utils.functions';

export abstract class CommonResponseDto {
  @Expose()
  @IsString()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  @Transform(setDateLocal, {
    toPlainOnly: true,
  })
  dateCreate: Date;

  @Expose()
  @ApiProperty()
  @Transform(setDateLocal, {
    toPlainOnly: true,
  })
  dateUpdate: Date;

  @Expose()
  @IsBoolean()
  @ApiProperty()
  deleted: boolean;
}
