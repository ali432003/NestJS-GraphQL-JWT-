import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { LoginAuthInput } from './dto/login-auth.input';
import { Response } from 'express';
import prisma from 'prisma/prisma';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async create(createAuthInput: CreateAuthInput) {
    try {
      const { name, email, password } = createAuthInput;
      const hash = bcrypt.hashSync(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hash, role: 'NORMAL_USER' },
      });
      if (!user) throw new HttpException('User not created', HttpStatus.BAD_REQUEST);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginAuthInput: LoginAuthInput, res: Response) {
    try {
      const { email, password } = loginAuthInput;
      const user = await prisma.user.findUnique({
        where: { email }
      });
      if (!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      if (user.password !== password) throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

      const token = sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1d' });
      res.cookie('token', token, { httpOnly: true });
      return { ...user, token: token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
