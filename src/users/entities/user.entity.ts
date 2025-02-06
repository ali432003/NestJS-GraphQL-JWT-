import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post, Profile } from '@prisma/client';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

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

  @Field()
  @IsEnum(['ADMIN', 'NORMAL_USER'])
  role: string
}
