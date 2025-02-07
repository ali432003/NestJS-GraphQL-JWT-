import { IsEnum } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { Role } from 'types/roles.enum';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field(()=> Role)
    @IsEnum(['ADMIN', 'NORMAL_USER'])
    role: Role
}
