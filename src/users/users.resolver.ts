import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'middleware/auth.middleware';
import { Roles } from 'decorators/roles.decorator';
import { Role } from 'types/roles.enum';
import { RolesGuard } from 'middleware/roles.authorization';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [User], { name: 'users' })
  @Roles(Role.ADMIN) // This is the mutation that is allowed to ADMIN only!
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @Roles(Role.ADMIN) 
  @UseGuards(AuthGuard, RolesGuard)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User, { name: 'updateUser' })
  @Roles(Role.ADMIN, Role.NORMAL_USER) 
  @UseGuards(AuthGuard, RolesGuard)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  @Roles(Role.ADMIN) 
  @UseGuards(AuthGuard, RolesGuard)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
