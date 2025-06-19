import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateNaSurveyInput {
  @IsString()
  @Field(() => String)
  area: string;

  @IsString()
  @Field(() => String)
  sub_division: string;

  @IsString()
  @Field(() => String)
  survey_no: string;
}
