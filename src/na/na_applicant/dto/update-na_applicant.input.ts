import { CreateNaApplicantInput } from './create-na_applicant.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNaApplicantInput extends PartialType(CreateNaApplicantInput) {
  @Field(() => Int)
  id: number;
}
