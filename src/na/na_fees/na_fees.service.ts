import { Injectable } from '@nestjs/common';
import { CreateNaFeeInput } from './dto/create-na_fee.input';
import { UpdateNaFeeInput } from './dto/update-na_fee.input';

@Injectable()
export class NaFeesService {
  create(createNaFeeInput: CreateNaFeeInput) {
    return 'This action adds a new naFee';
  }

  findAll() {
    return `This action returns all naFees`;
  }

  findOne(id: number) {
    return `This action returns a #${id} naFee`;
  }

  update(id: number, updateNaFeeInput: UpdateNaFeeInput) {
    return `This action updates a #${id} naFee`;
  }

  remove(id: number) {
    return `This action removes a #${id} naFee`;
  }
}
