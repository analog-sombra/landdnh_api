import { InputType, Int, Field } from '@nestjs/graphql';
import { QueryType, RequestType } from '@prisma/client';
import { IsEnum, IsNumber } from 'class-validator';

@InputType()
export class SearchNaQueryInput {
  @IsNumber()
  @Field(() => Int)
  na_formId: number;

  @IsEnum(QueryType)
  @Field(() => QueryType)
  type: QueryType;

  @IsEnum(RequestType)
  @Field(() => RequestType)
  request_type: RequestType;
}
