import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateNaInput } from './create-na.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { DepartmentStatus, Status } from '@prisma/client';

@InputType()
export class UpdateNaInput extends PartialType(CreateNaInput) {
  @IsNumber()
  @Field(() => Int)
  id: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  villageId: number;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  last_name: string;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  q1: boolean;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q2: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q3: string;

  @IsString()
  @Field(() => String, { nullable: true })
  anx1: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  anx2: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  anx3: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  anx4: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  anx5: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q4: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q5: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q6: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q7: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q8: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q9: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q10: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q11: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q12: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q13: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q14: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q15: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q16: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q17: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  q18: string;

  @IsOptional()
  @IsEnum(DepartmentStatus)
  @Field(() => DepartmentStatus, { nullable: true })
  dept_status: DepartmentStatus;

  @IsOptional()
  @IsEnum(Status)
  @Field(() => Status, { nullable: true })
  status: Status;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  deletedById: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  updatedById: number;
}
