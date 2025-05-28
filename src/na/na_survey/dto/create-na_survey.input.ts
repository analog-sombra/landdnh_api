import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateNaSurveyInput {
  @IsNumber()
  @Field(() => Int)
  villageId: number;

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
