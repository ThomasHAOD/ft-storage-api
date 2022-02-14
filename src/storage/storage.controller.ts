import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { StorageService } from './storage.service';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as gcs from '@google-cloud/storage';
import * as fs from 'fs/promises';

const storage = new gcs.Storage();
const bucketName = 'fresh-traks-bucket1';
const bucket = storage.bucket(bucketName);


@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('File', { dest: './dist/uploads/', limits: { fileSize: 100000000 } }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const relativePath = file.path;
    const filename = relativePath.split('uploads/')[1] + '.mp3';
    const filepath = __dirname.slice(0, -12) + relativePath

    console.log({ filepath });


    async function uploadFile() {
      await storage.bucket(bucketName).upload(filepath, {
        destination: filename,
      });
    }

    await uploadFile().catch(console.error);
    try {
      fs.unlink(filepath);
    } catch (error) {
      console.error(`ERROR: ${filename} was not deleted successfully`, error);
    }
    return { filename }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStorageDto: UpdateStorageDto) {
    return this.storageService.update(+id, updateStorageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageService.remove(+id);
  }
}
