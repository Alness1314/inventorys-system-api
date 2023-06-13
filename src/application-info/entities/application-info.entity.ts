import { CommonEntity } from 'src/common/common.entity';
import { VirtualMachine } from 'src/virtual-machine/entities/virtual-machine.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: 'aplication_info' })
export class ApplicationInfo extends CommonEntity {
  @Column({
    name: 'application_name',
    type: 'character varying',
    length: 128,
    nullable: false,
  })
  applicationName: string;

  @Column({
    name: 'default_port',
    type: 'character varying',
    length: 32,
  })
  defaultPort: string;

  @Column({
    name: 'modified_port',
    type: 'character varying',
    length: 32,
  })
  modifiedPort: string;

  @Column({
    name: 'external_ip',
    type: 'character varying',
    length: 64,
  })
  externalIp: string;

  @Column({
    type: 'character varying',
    length: 256,
  })
  description: string;

  @ManyToMany(() => VirtualMachine, (vm) => vm.id)
  virtualMachine: VirtualMachine[];
}
