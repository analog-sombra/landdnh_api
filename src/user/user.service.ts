import { BadRequestException, Injectable } from '@nestjs/common';
import { SelectedFields } from 'src/utils/methods';
import { PrismaService } from 'prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(id: number, fields: SelectedFields) {
    try {
      const user_response = await this.prisma.user.findFirst({
        where: {
          id: id,
          status: 'ACTIVE',
          deletedAt: null,
        },
        select: fields,
      });

      if (!fields) {
        throw new BadRequestException('User Not Found');
      }

      return user_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async getAllUser(take: number, skip: number, fields: SelectedFields) {
    try {
      const user_response = await this.prisma.user.findMany({
        where: {
          status: 'ACTIVE',
          deletedAt: null,
        },
        // select: fields['data'] as SelectedFields,

        take: take,
        skip: skip,
      });

      const total = await this.prisma.user.count({
        where: {
          status: 'ACTIVE',
          deletedAt: null,
        },
      });

      if (!fields) {
        throw new BadRequestException('User Not Found');
      }

      return { data: user_response, total, skip, take };
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async getUserByRole(role: Role, fields: SelectedFields) {
    try {
      const user_response = await this.prisma.user.findMany({
        where: {
          status: 'ACTIVE',
          deletedAt: null,
          role: role,
        },
        select: fields,
      });

      if (!fields) {
        throw new BadRequestException('User Not Found');
      }

      return user_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }
  async getUserByRoles(role: Role[], fields: SelectedFields) {
    try {
      const user_response = await this.prisma.user.findMany({
        where: {
          status: 'ACTIVE',
          deletedAt: null,
          role: {
            in: role,
          },
        },
        select: fields,
      });

      if (!fields) {
        throw new BadRequestException('User Not Found');
      }

      return user_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }
}
