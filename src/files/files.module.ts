import { Module } from '@nestjs/common';
import { FilesService } from './service/files.service';
import { FilesController } from './controller/files.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
