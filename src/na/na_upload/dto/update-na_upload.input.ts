import { CreateNaUploadInput } from './create-na_upload.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNaUploadInput extends PartialType(CreateNaUploadInput) {
  @Field(() => Int)
  id: number;
}
