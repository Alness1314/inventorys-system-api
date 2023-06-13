import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'date_create',
    type: 'timestamp with time zone',
    nullable: true,
  })
  dateCreate: Date;

  @Column({
    name: 'date_update',
    type: 'timestamp with time zone',
    nullable: true,
  })
  dateUpdate: Date;

  @Column({ name: 'deleted', type: 'boolean', default: false })
  deleted: boolean;

  @BeforeInsert()
  createEntity() {
    const currentDate = new Date();
    this.dateCreate = currentDate;
    this.dateUpdate = currentDate;
  }

  @BeforeUpdate()
  updateEntity() {
    const currentDate = new Date();
    this.dateUpdate = currentDate;
  }
}
