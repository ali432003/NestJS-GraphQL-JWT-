import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  providers: [AuthResolver, AuthService],
  exports:[AuthService]
})
export class AuthModule {}
