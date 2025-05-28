import { Resolver, Query, Args, Int, Info } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { GraphQLResolveInfo } from 'graphql';
import { getSelectedFields } from 'src/utils/methods';
import { UserPagination } from './entities/user.pagination.entity';
import { Role } from '@prisma/client';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  getUserById(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.userService.getUserById(id, fields);
  }

  @Query(() => UserPagination)
  getAllUser(
    @Args('take', { type: () => Int }) take: number,
    @Args('skip', { type: () => Int }) skip: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.userService.getAllUser(take, skip, fields);
  }

  @Query(() => [User])
  getUserByRole(
    @Args('role', { type: () => Role }) role: Role,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.userService.getUserByRole(role, fields);
  }
}
