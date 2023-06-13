import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { HardwareInfo } from './hardware-info.entity';
import { VirtualMachine } from 'src/virtual-machine/entities/virtual-machine.entity';

@Entity({ name: 'server_info' })
export class ServerInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'character varying',
    length: 64,
    nullable: false,
    unique: true,
  })
  serverName: string;

  @Column({ type: 'character varying', length: 256, nullable: false })
  description: string;

  @Column({
    name: 'serial_number',
    type: 'character varying',
    length: 128,
    nullable: false,
  })
  serialNumber: string;

  @Column({ name: 'operating_system', type: 'character varying', length: 64 })
  operatingSystem: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({
    name: 'ip_server',
    type: 'character varying',
    length: 64,
    nullable: false,
  })
  serverIp: string;

  @Column({ name: 'ip_external', type: 'character varying', length: 64 })
  externalIp: string;

  @Column({
    name: 'last_maintenance',
    type: 'timestamp with time zone',
  })
  lastMaintenance: Date;

  @CreateDateColumn({ name: 'date_create', type: 'timestamp with time zone' })
  dateCreate: Date;

  @Column({ name: 'deleted', type: 'boolean', default: false })
  deleted: boolean;

  @OneToOne(() => HardwareInfo, (hardwareInfo) => hardwareInfo.serverInfo, {
    cascade: true,
  })
  hardwareInfo: HardwareInfo;

  @OneToMany(() => VirtualMachine, (vm) => vm.server)
  virtualMachines: VirtualMachine[];
}
