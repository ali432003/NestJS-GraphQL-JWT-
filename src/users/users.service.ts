import { BadGatewayException, BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import prisma from 'prisma/prisma';

@Injectable()
export class UsersService {
  async findAll() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      return error.message
    }
  }

  async findOne(id: string) {
    try {
      const _id = await prisma.user.findUnique({ where: { id } });
      if (!_id) throw new BadRequestException(HttpStatus.BAD_REQUEST)
      return _id
    } catch (error) {
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    try {
      return await prisma.user.update({
        where: { id },
        data: { ...updateUserInput }
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY)
    }
  }


  async remove(id: string) {
    try {
      return await prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY)
    }
  }
}
