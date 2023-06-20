import { Module } from '@nestjs/common';
import { ApplicationInfoService } from './service/application-info.service';
import { ApplicationInfoController } from './controller/application-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationInfo } from './entities/application-info.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationInfo]), AuthModule],
  controllers: [ApplicationInfoController],
  providers: [ApplicationInfoService],
  exports: [ApplicationInfoService, TypeOrmModule],
})
export class ApplicationInfoModule {}
