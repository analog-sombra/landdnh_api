import { Resolver, Mutation, Args, Info, Query, Int } from '@nestjs/graphql';
import { NaFeesService } from './na_fees.service';
import { NaFee } from './entities/na_fee.entity';
import { CreateNaFeeInput } from './dto/create-na_fee.input';
import { GraphQLResolveInfo } from 'graphql';
import { getSelectedFields } from 'src/utils/methods';
import { UpdateNaFeeInput } from './dto/update-na_fee.input';

@Resolver(() => NaFee)
export class NaFeesResolver {
  constructor(private readonly naFeesService: NaFeesService) {}

  @Mutation(() => NaFee)
  createNaFee(
    @Args('createNaFeeInput') createNaFeeInput: CreateNaFeeInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naFeesService.createNaFee(createNaFeeInput, fields);
  }

  @Query(() => [NaFee])
  getPendingNaFee(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naFeesService.getPendingNaFee(id, fields);
  }

  @Query(() => [NaFee])
  getFeesHistory(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naFeesService.getFeesHistory(id, fields);
  }

  @Mutation(() => NaFee)
  payNaFee(
    @Args('updateNaFeeInput') updateNaFeeInput: UpdateNaFeeInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naFeesService.payNaFee(updateNaFeeInput, fields);
  }
}
