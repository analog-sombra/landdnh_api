import { Injectable } from '@nestjs/common';
import { CreateNaApplicantInput } from './dto/create-na_applicant.input';
import { UpdateNaApplicantInput } from './dto/update-na_applicant.input';

@Injectable()
export class NaApplicantService {
  create(createNaApplicantInput: CreateNaApplicantInput) {
    return 'This action adds a new naApplicant';
  }

  findAll() {
    return `This action returns all naApplicant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} naApplicant`;
  }

  update(id: number, updateNaApplicantInput: UpdateNaApplicantInput) {
    return `This action updates a #${id} naApplicant`;
  }

  remove(id: number) {
    return `This action removes a #${id} naApplicant`;
  }
}
