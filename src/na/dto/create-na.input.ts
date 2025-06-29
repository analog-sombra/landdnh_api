import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateNaApplicantInput } from '../na_applicant/dto/create-na_applicant.input';
import { CreateNaSurveyInput } from '../na_survey/dto/create-na_survey.input';

@InputType()
export class CreateNaInput {
  @IsNumber()
  @Field(() => Int)
  villageId: number;

  @IsString()
  @Field(() => String, { nullable: true })
  last_name: string;

  @IsBoolean()
  @Field(() => Boolean)
  q1: boolean;

  @IsString()
  @Field(() => String, { nullable: true })
  q2: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q3: string;

  @IsString()
  @Field(() => String, { nullable: true })
  anx1: string;

  @IsString()
  @Field(() => String, { nullable: true })
  anx2: string;

  @IsString()
  @Field(() => String, { nullable: true })
  anx3: string;

  @IsString()
  @Field(() => String, { nullable: true })
  anx4: string;

  @IsString()
  @Field(() => String, { nullable: true })
  anx5: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q4: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q5: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q6: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q7: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q8: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q9: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q10: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q11: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q12: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q13: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q14: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q15: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q16: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q17: string;

  @IsString()
  @Field(() => String, { nullable: true })
  q18: string;

  @IsArray()
  @Field(() => [CreateNaApplicantInput], { nullable: true })
  applicants: CreateNaApplicantInput[];

  @IsArray()
  @Field(() => [CreateNaSurveyInput], { nullable: true })
  surveys: CreateNaSurveyInput[];

  @IsNumber()
  @Field(() => Int)
  createdById: number;
}
