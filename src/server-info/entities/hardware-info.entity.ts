import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ServerInfo } from './server-info.entity';

@Entity({ name: 'hardware_info' })
export class HardwareInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'character varying', length: 256 })
  processor: string;

  @Column({ name: 'ram_memory', type: 'character varying', length: 256 })
  ramMemory: string;

  @Column({ type: 'character varying', length: 256 })
  storage: string;

  @Column({ name: 'network_adapter', type: 'character varying', length: 256 })
  networkAdapter: string;

  @Column({ name: 'graphics_card', type: 'character varying', length: 256 })
  graphicsCard: string;

  @Column({ type: 'character varying', length: 256 })
  description: string;

  @OneToOne(() => ServerInfo, (server) => server.hardwareInfo)
  @JoinColumn({ name: 'server_id' })
  serverInfo: ServerInfo;
}
