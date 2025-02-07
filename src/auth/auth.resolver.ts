import { Resolver, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';
import { LoginAuthInput } from './dto/login-auth.input'
import { Response } from 'express';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => Auth, { name: 'registerUser' })
  registerUser(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.create(createAuthInput);
  }
  
  @Mutation(() => Auth, { name: 'loginUser' })
  loginUser(@Args('loginAuthInput') loginAuthInput: LoginAuthInput, @Context('res') res: Response) {
    return this.authService.login(loginAuthInput,res);
  }
}
