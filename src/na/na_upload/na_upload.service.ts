import { Injectable } from '@nestjs/common';
import { CreateNaUploadInput } from './dto/create-na_upload.input';
import { UpdateNaUploadInput } from './dto/update-na_upload.input';

@Injectable()
export class NaUploadService {
  create(createNaUploadInput: CreateNaUploadInput) {
    return 'This action adds a new naUpload';
  }

  findAll() {
    return `This action returns all naUpload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} naUpload`;
  }

  update(id: number, updateNaUploadInput: UpdateNaUploadInput) {
    return `This action updates a #${id} naUpload`;
  }

  remove(id: number) {
    return `This action removes a #${id} naUpload`;
  }
}
