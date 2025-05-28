import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NaSurveyService } from './na_survey.service';
import { NaSurvey } from './entities/na_survey.entity';
import { CreateNaSurveyInput } from './dto/create-na_survey.input';
import { UpdateNaSurveyInput } from './dto/update-na_survey.input';

@Resolver(() => NaSurvey)
export class NaSurveyResolver {
  constructor(private readonly naSurveyService: NaSurveyService) {}

  @Mutation(() => NaSurvey)
  createNaSurvey(@Args('createNaSurveyInput') createNaSurveyInput: CreateNaSurveyInput) {
    return this.naSurveyService.create(createNaSurveyInput);
  }

  @Query(() => [NaSurvey], { name: 'naSurvey' })
  findAll() {
    return this.naSurveyService.findAll();
  }

  @Query(() => NaSurvey, { name: 'naSurvey' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.naSurveyService.findOne(id);
  }

  @Mutation(() => NaSurvey)
  updateNaSurvey(@Args('updateNaSurveyInput') updateNaSurveyInput: UpdateNaSurveyInput) {
    return this.naSurveyService.update(updateNaSurveyInput.id, updateNaSurveyInput);
  }

  @Mutation(() => NaSurvey)
  removeNaSurvey(@Args('id', { type: () => Int }) id: number) {
    return this.naSurveyService.remove(id);
  }
}
