import { Resolver, Query, Mutation, Args, Int, Info } from '@nestjs/graphql';
import { NaService } from './na.service';
import { Na } from './entities/na.entity';
import { CreateNaInput } from './dto/create-na.input';
import { GraphQLResolveInfo } from 'graphql';
import { getSelectedFields } from 'src/utils/methods';
import { NaPagination } from './entities/na.pagination.entity';
import { UpdateNaInput } from './dto/update-na.input';

@Resolver(() => Na)
export class NaResolver {
  constructor(private readonly naService: NaService) {}

  @Mutation(() => Na)
  createNa(
    @Args('createNaInput') createNaInput: CreateNaInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naService.createNa(createNaInput, fields);
  }

  @Query(() => Na)
  getNaById(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naService.getNaById(id, fields);
  }

  @Query(() => NaPagination)
  getAllNa(
    @Args('take', { type: () => Int }) take: number,
    @Args('skip', { type: () => Int }) skip: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naService.getAllNa(take, skip, fields);
  }

  @Mutation(() => Na)
  updateNa(
    @Args('updateNaInput') updateNaInput: UpdateNaInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naService.updateNa(updateNaInput, fields);
  }

  @Mutation(() => Na)
  submitNaById(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naService.submitNaById(id, fields);
  }
}
