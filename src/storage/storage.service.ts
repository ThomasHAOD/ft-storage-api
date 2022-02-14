import { Injectable } from '@nestjs/common';
import { UpdateStorageDto } from './dto/update-storage.dto';

@Injectable()
export class StorageService {
  create(track: Blob) {
    console.log(track);

    return 'This action adds a new storage';
  }

  findOne(id: number) {
    return `This action returns a #${id} storage`;
  }

  update(id: number, updateStorageDto: UpdateStorageDto) {
    return `This action updates a #${id} storage`;
  }

  remove(id: number) {
    return `This action removes a #${id} storage`;
  }
}
