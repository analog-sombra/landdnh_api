import { InputType, Int, Field, registerEnumType } from '@nestjs/graphql';
import { QueryStatus, QueryType, RequestType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

registerEnumType(QueryType, {
  name: 'QueryType', // this one is mandatory
});
registerEnumType(RequestType, {
  name: 'RequestType', // this one is mandatory
});
registerEnumType(QueryStatus, {
  name: 'QueryStatus', // this one is mandatory
});

@InputType()
export class CreateNaQueryInput {
  @IsNumber()
  @Field(() => Int)
  na_formId: number;

  @IsEnum(QueryType)
  @Field(() => QueryType)
  type: QueryType;

  @IsNumber()
  @Field(() => Int)
  from_userId: number;

  @IsNumber()
  @Field(() => Int)
  to_userId: number;

  @IsEnum(RequestType)
  @Field(() => RequestType)
  request_type: RequestType;

  @IsEnum(QueryStatus)
  @Field(() => QueryStatus)
  query_status: QueryStatus;

  @IsString()
  @Field(() => String)
  query: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  upload_url_1: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  upload_url_2: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  upload_url_3: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  upload_url_4: string;

  @IsOptional()
  @IsString()
  @Field(() => String, { nullable: true })
  upload_url_5: string;

  @IsNumber()
  @Field(() => Int)
  createdById: number;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  dept_update: boolean;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  seek_report: boolean;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  submit_report: boolean;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  noting_draft: boolean;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  allot_hearing: boolean;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  hearing_schedule: boolean;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  hearing: boolean;

  @IsOptional()
  @IsBoolean()
  @Field(() => Boolean, { nullable: true })
  intimation_draft: boolean;
}
