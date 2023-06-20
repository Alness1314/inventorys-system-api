import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { hash } from 'bcrypt';
import { CommonEntity } from 'src/common/common.entity';
import { Profile } from 'src/profiles/entities/profile.entity';

@Entity({ name: 'users' })
export class User extends CommonEntity {
  @Column({
    type: 'character varying',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'character varying',
    length: 128,
    nullable: false,
    select: false,
  })
  password: string;

  //@OneToOne(() => Detail)
  //@JoinColumn()
  //detail: Detail;

  //@Column({ type: 'nvarchar', length: 255, nullable:true})
  //detail: string;

  @ManyToMany(() => Profile)
  @JoinTable({ name: 'user_profile' })
  profiles: Profile[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) {
      return;
    }
    this.password = await hash(this.password, 10);
  }

  @BeforeInsert()
  @BeforeUpdate()
  checkEmail() {
    this.email = this.email.toLowerCase().trim();
  }
}
