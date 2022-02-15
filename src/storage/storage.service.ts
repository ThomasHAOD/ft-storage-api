import { Injectable } from '@nestjs/common';
import { UpdateStorageDto } from './dto/update-storage.dto';
import * as gcs from '@google-cloud/storage';
import * as fs from 'fs/promises';

const storage = new gcs.Storage();
const bucketName = 'fresh-traks-bucket1';
const bucket = storage.bucket(bucketName);
@Injectable()
export class StorageService {
  async create(file: Express.Multer.File) {
    const relativePath = file.path;
    const filename = relativePath.split('uploads/')[1] + '.mp3';
    const filepath = __dirname.slice(0, -12) + relativePath;

    async function uploadFile() {
      try {
        await bucket.upload(filepath, {
          destination: filename,
        });
        const file = bucket.file(filename);
        await file.makePublic();
      } catch (error) {
        console.error(error)
      }
    }

    await uploadFile().catch(console.error);
    try {
      fs.unlink(filepath);
    } catch (error) {
      console.error(`ERROR: ${filename} was not deleted successfully`, error);
    }

    return { filename };
  }

  update(id: string, filename: string) {
    const file = bucket.file(id);
    file.rename(filename, (error, renamedFile) => {
      if (error) {
        console.error(new Error('Error: did not rename file'));
      }
      const newFile = bucket.file(filename);
      newFile.makePublic()

    });
    return `Renamed File`;
  }

  remove(id: number) {
    return `This action removes a #${id} storage`;
  }
}
