import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateObj } from './entities/storage.entity';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('File', {
      dest: './dist/uploads/',
      limits: { fileSize: 100000000 },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.storageService.create(file);
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
