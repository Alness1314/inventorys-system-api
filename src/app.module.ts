import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import { ServerInfoModule } from './server-info/server-info.module';
import { VirtualMachineModule } from './virtual-machine/virtual-machine.module';
import { ApplicationInfoModule } from './application-info/application-info.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
    }),
    DatabaseModule,
    ServerInfoModule,
    VirtualMachineModule,
    ApplicationInfoModule,
    UsersModule,
    ProfilesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
