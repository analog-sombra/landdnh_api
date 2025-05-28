import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SelectedFields } from 'src/utils/methods';

@Injectable()
export class VillageService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllVillage(fields: SelectedFields) {
    try {
      const allvillages = await this.prisma.village.findMany({
        where: {
          status: true,
        },
        select: fields,
      });

      if (!fields) {
        throw new BadRequestException('No Villages Found');
      }

      return allvillages;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async getVillageById(id: number, fields: SelectedFields) {
    try {
      const villages_response = await this.prisma.village.findFirst({
        where: {
          id: id,
          status: true,
        },
        select: fields,
      });

      if (!fields) {
        throw new BadRequestException('Villages Not Found');
      }

      return villages_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }
}
