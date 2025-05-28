import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NaApplicantService } from './na_applicant.service';
import { NaApplicant } from './entities/na_applicant.entity';
import { CreateNaApplicantInput } from './dto/create-na_applicant.input';
import { UpdateNaApplicantInput } from './dto/update-na_applicant.input';

@Resolver(() => NaApplicant)
export class NaApplicantResolver {
  constructor(private readonly naApplicantService: NaApplicantService) {}

  @Mutation(() => NaApplicant)
  createNaApplicant(@Args('createNaApplicantInput') createNaApplicantInput: CreateNaApplicantInput) {
    return this.naApplicantService.create(createNaApplicantInput);
  }

  @Query(() => [NaApplicant], { name: 'naApplicant' })
  findAll() {
    return this.naApplicantService.findAll();
  }

  @Query(() => NaApplicant, { name: 'naApplicant' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.naApplicantService.findOne(id);
  }

  @Mutation(() => NaApplicant)
  updateNaApplicant(@Args('updateNaApplicantInput') updateNaApplicantInput: UpdateNaApplicantInput) {
    return this.naApplicantService.update(updateNaApplicantInput.id, updateNaApplicantInput);
  }

  @Mutation(() => NaApplicant)
  removeNaApplicant(@Args('id', { type: () => Int }) id: number) {
    return this.naApplicantService.remove(id);
  }
}
