import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from '../service/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { fileFilter } from '../helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from '../helpers/fileNamer.helper copy';
import { ConfigService } from '@nestjs/config';
import { ConfigKeys } from 'src/utils/keys/configs.keys';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidProfiles } from 'src/auth/interfaces/valid-profiles';

@Controller('files')
@ApiTags('Files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly _configService: ConfigService,
  ) {}

  @Post('upload')
  @Auth(ValidProfiles.admin)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      limits: { fileSize: 5000000 },
      storage: diskStorage({
        destination: './static/uploads',
        filename: fileNamer,
      }),
    }),
  )
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('File not uploaded');
    }
    const secureUrl = `${this._configService.get<string>(
      ConfigKeys.SERVER_HOST,
    )}/files/download/${file.filename}`;

    return { enpointImage: secureUrl, name: file.filename };
  }

  @Get('download/:imageName')
  @Auth()
  findServerImage(@Res() res: Response, @Param('imageName') imageName: string) {
    const path = this.filesService.getStaticServerImage(imageName);
    res.sendFile(path);
  }
}
