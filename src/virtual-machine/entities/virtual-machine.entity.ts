import { ApplicationInfo } from 'src/application-info/entities/application-info.entity';
import { ServerInfo } from 'src/server-info/entities/server-info.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'virtual_machine' })
export class VirtualMachine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'vmachine_name',
    type: 'character varying',
    length: 128,
    nullable: false,
  })
  nameVM: string;

  @Column({
    name: 'description',
    type: 'character varying',
    length: 256,
  })
  description: string;

  @Column({
    name: 'ip_vm',
    type: 'character varying',
    length: 32,
  })
  ipVM: string;

  @Column({
    name: 'external_ip',
    type: 'character varying',
    length: 32,
  })
  externalIp: string;

  @ManyToMany(() => ApplicationInfo, (appInfo) => appInfo.id, {
    nullable: true,
    eager: true,
  })
  @JoinTable({
    name: 'vMachines_applications',
    joinColumns: [{ name: 'vmachine_id' }, { name: 'appInfo_id' }],
  })
  applicationInfo: ApplicationInfo[];

  @CreateDateColumn({ name: 'date_create', type: 'timestamp with time zone' })
  dateCreate: Date;

  @Column({ name: 'deleted', type: 'boolean', default: false })
  deleted: boolean;

  @ManyToOne(() => ServerInfo, (server) => server.virtualMachines)
  @JoinColumn({ name: 'server_id' })
  server: ServerInfo;
}
