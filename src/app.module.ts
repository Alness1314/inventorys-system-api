import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { enviroments } from './enviroments';
import { ServerInfoModule } from './server-info/server-info.module';
import { VirtualMachineModule } from './virtual-machine/virtual-machine.module';
import { ApplicationInfoModule } from './application-info/application-info.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';
import config from './config';
import { UsersService } from './users/service/users.service';
import { setDefaultUser } from './users/config/default-user';
import { ProfilesService } from './profiles/service/profiles.service';
import { setDefaultProfiles } from './users/config/default-profiles';
import { FilesModule } from './files/files.module';

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
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UsersService,
    private readonly _profileService: ProfilesService,
  ) {
    setDefaultProfiles(_configService, _profileService);
    setDefaultUser(_configService, _userService, _profileService);
  }
}
