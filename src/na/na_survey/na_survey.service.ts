import { Injectable } from '@nestjs/common';
import { CreateNaSurveyInput } from './dto/create-na_survey.input';
import { UpdateNaSurveyInput } from './dto/update-na_survey.input';

@Injectable()
export class NaSurveyService {
  create(createNaSurveyInput: CreateNaSurveyInput) {
    return 'This action adds a new naSurvey';
  }

  findAll() {
    return `This action returns all naSurvey`;
  }

  findOne(id: number) {
    return `This action returns a #${id} naSurvey`;
  }

  update(id: number, updateNaSurveyInput: UpdateNaSurveyInput) {
    return `This action updates a #${id} naSurvey`;
  }

  remove(id: number) {
    return `This action removes a #${id} naSurvey`;
  }
}
