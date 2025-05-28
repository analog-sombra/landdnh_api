import { Resolver, Query, Mutation, Args, Info } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { User } from 'src/user/entities/user.entity';
import { LoginAuthInput } from './dto/login-auth.input';
import { GraphQLResolveInfo } from 'graphql';
import { getSelectedFields } from 'src/utils/methods';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  registerUser(
    @Args('createAuthInput') createAuthInput: CreateAuthInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);

    return this.authService.registerUser(createAuthInput, fields);
  }

  @Query(() => User)
  loginUser(
    @Args('loginAuthInput') loginAuthInput: LoginAuthInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.authService.loginUser(loginAuthInput, fields);
  }
}
