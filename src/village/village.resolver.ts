import { Resolver, Query, Args, Int, Info } from '@nestjs/graphql';
import { VillageService } from './village.service';
import { Village } from './entities/village.entity';
import { GraphQLResolveInfo } from 'graphql';
import { getSelectedFields } from 'src/utils/methods';

@Resolver(() => Village)
export class VillageResolver {
  constructor(private readonly villageService: VillageService) {}

  @Query(() => [Village])
  getAllVillage(@Info() info: GraphQLResolveInfo) {
    const fields = getSelectedFields(info);
    return this.villageService.getAllVillage(fields);
  }

  @Query(() => Village)
  getVillageById(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.villageService.getVillageById(id, fields);
  }

  // @Mutation(() => Village)
  // createVillage(@Args('createVillageInput') createVillageInput: CreateVillageInput) {
  //   return this.villageService.create(createVillageInput);
  // }

  // @Mutation(() => Village)
  // updateVillage(@Args('updateVillageInput') updateVillageInput: UpdateVillageInput) {
  //   return this.villageService.update(updateVillageInput.id, updateVillageInput);
  // }

  // @Mutation(() => Village)
  // removeVillage(@Args('id', { type: () => Int }) id: number) {
  //   return this.villageService.remove(id);
  // }
}
