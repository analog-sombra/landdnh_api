import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { PrismaService } from 'prisma/prisma.service';
import * as argon2 from 'argon2';
import { LoginAuthInput } from './dto/login-auth.input';
import { SelectedFields } from 'src/utils/methods';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async registerUser(createAuthInput: CreateAuthInput, fields: SelectedFields) {
    try {
      const { firstName, lastName, password, contact, role } = createAuthInput;

      const passwordHash = await argon2.hash(password);

      const user_response = await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          password: passwordHash,
          contact,
          role,
        },
        select: fields,
      });

      if (!user_response) {
        throw new BadRequestException('User registration failed');
      }

      return user_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async loginUser(loginAuthInput: LoginAuthInput, fields: SelectedFields) {
    try {
      const { contact, password } = loginAuthInput;

      const user_response = await this.prisma.user.findFirst({
        where: {
          contact,
        },
        select: { ...fields, password: true },
      });

      if (!user_response) {
        throw new BadRequestException('User not found');
      }

      if (!user_response.password) {
        throw new BadRequestException('Password not found');
      }

      const isPasswordValid = await argon2.verify(
        user_response.password,
        password,
      );

      if (!isPasswordValid) {
        throw new BadRequestException('Invalid password');
      }

      return user_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }
}
