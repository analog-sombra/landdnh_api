import { CreateNaSurveyInput } from './create-na_survey.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNaSurveyInput extends PartialType(CreateNaSurveyInput) {
  @Field(() => Int)
  id: number;
}
