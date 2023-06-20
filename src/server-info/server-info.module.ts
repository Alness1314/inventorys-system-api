import { Module } from '@nestjs/common';
import { ServerInfoService } from './service/server-info.service';
import { ServerInfoController } from './controller/server-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerInfo } from './entities/server-info.entity';
import { HardwareInfo } from './entities/hardware-info.entity';
import { VirtualMachineModule } from 'src/virtual-machine/virtual-machine.module';
import { VirtualMachineService } from 'src/virtual-machine/service/virtual-machine.service';
import { ApplicationInfoModule } from 'src/application-info/application-info.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServerInfo, HardwareInfo]),
    AuthModule,
    VirtualMachineModule,
    ApplicationInfoModule,
  ],
  controllers: [ServerInfoController],
  providers: [ServerInfoService, VirtualMachineService],
  exports: [ServerInfoService, TypeOrmModule],
})
export class ServerInfoModule {}
