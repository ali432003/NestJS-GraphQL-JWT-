import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post, Profile } from '@prisma/client';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { Role } from 'src/types/roles.enum';

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @Field(()=> Role)
  @IsEnum(['ADMIN', 'NORMAL_USER'])
  role: string
}
