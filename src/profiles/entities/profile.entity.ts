import { CommonEntity } from 'src/common/common.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'profiles' })
export class Profile extends CommonEntity {
  @Column({
    type: 'character varying',
    length: 32,
    nullable: false,
    unique: true,
  })
  name: string;
}
