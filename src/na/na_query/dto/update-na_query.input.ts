import { CreateNaQueryInput } from './create-na_query.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNaQueryInput extends PartialType(CreateNaQueryInput) {
  @Field(() => Int)
  id: number;
}
