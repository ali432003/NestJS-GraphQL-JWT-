import { registerEnumType } from "@nestjs/graphql";

export enum Role {
    ADMIN = 'ADMIN',
    NORMAL_USER = 'NORMAL_USER'
}

registerEnumType(Role, {
    name: 'Role',  // To be used in the gql schema
  });