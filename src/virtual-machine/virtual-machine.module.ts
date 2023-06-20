import { Module } from '@nestjs/common';
import { VirtualMachineService } from './service/virtual-machine.service';
import { VirtualMachineController } from './controller/virtual-machine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VirtualMachine } from './entities/virtual-machine.entity';
import { ApplicationInfoModule } from 'src/application-info/application-info.module';
import { AuthModule } from 'src/auth/auth.module';
//import { ApplicationInfo } from 'src/application-info/entities/application-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VirtualMachine]),
    ApplicationInfoModule,
    AuthModule,
  ],
  controllers: [VirtualMachineController],
  providers: [VirtualMachineService],
  exports: [VirtualMachineService, TypeOrmModule],
})
export class VirtualMachineModule {}
