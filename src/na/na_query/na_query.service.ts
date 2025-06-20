import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNaQueryInput } from './dto/create-na_query.input';
import { SelectedFields } from 'src/utils/methods';
import { PrismaService } from 'prisma/prisma.service';
import { QueryType } from '@prisma/client';

@Injectable()
export class NaQueryService {
  constructor(private readonly prisma: PrismaService) {}

  async createNaQuery(
    createNaQueryInput: CreateNaQueryInput,
    fields: SelectedFields,
  ) {
    try {
      const na_query_response = await this.prisma.na_query.create({
        data: {
          ...createNaQueryInput,
        },
        select: fields,
      });
      if (!na_query_response) {
        throw new BadRequestException('Query Not created');
      }
      return na_query_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async getQueryByType(
    id: number,
    querytype: QueryType[],
    fields: SelectedFields,
  ) {
    try {
      const na_query_response = await this.prisma.na_query.findMany({
        where: {
          na_formId: id,
          type: {
            in: querytype,
          },
          deletedAt: null,
          deletedBy: null,
        },
        select: fields,
      });
      if (!na_query_response) {
        throw new BadRequestException('Query Not found');
      }
      return na_query_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }
}
