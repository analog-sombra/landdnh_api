import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NaFeesService } from './na_fees.service';
import { NaFee } from './entities/na_fee.entity';
import { CreateNaFeeInput } from './dto/create-na_fee.input';
import { UpdateNaFeeInput } from './dto/update-na_fee.input';

@Resolver(() => NaFee)
export class NaFeesResolver {
  constructor(private readonly naFeesService: NaFeesService) {}

  @Mutation(() => NaFee)
  createNaFee(@Args('createNaFeeInput') createNaFeeInput: CreateNaFeeInput) {
    return this.naFeesService.create(createNaFeeInput);
  }

  @Query(() => [NaFee], { name: 'naFees' })
  findAll() {
    return this.naFeesService.findAll();
  }

  @Query(() => NaFee, { name: 'naFee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.naFeesService.findOne(id);
  }

  @Mutation(() => NaFee)
  updateNaFee(@Args('updateNaFeeInput') updateNaFeeInput: UpdateNaFeeInput) {
    return this.naFeesService.update(updateNaFeeInput.id, updateNaFeeInput);
  }

  @Mutation(() => NaFee)
  removeNaFee(@Args('id', { type: () => Int }) id: number) {
    return this.naFeesService.remove(id);
  }
}
