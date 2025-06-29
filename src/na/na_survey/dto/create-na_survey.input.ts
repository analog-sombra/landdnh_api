import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateNaSurveyInput {
  @IsString()
  @Field(() => String)
  area: string;

  @IsString()
  @Field(() => String)
  sub_division: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  survey_no: string;
}
