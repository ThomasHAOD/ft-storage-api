import {
  Controller,
  Header,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateObj } from './entities/storage.entity';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Get('download')
  @Header('Content-Type', 'audio/mp3')
  @Header('Content-Disposition', `attachment;`)
  async downloadFile(@Query('filename') filename: string) {
    return await this.storageService.download(filename);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('File', {
      dest: './dist/uploads/',
      limits: { fileSize: 100000000 },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.storageService.upload(file);
  }

  @Post('rename/:id')
  update(@Param('id') id: string, @Body() { filename }: UpdateObj) {
    return this.storageService.update(id, filename);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageService.remove(+id);
  }
}
