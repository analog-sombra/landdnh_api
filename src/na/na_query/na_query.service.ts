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
    const { dept_update, seek_report, ...rest } = createNaQueryInput;
    try {
      const na_query_response = await this.prisma.na_query.create({
        data: {
          ...rest,
        },
        select: fields,
      });
      if (!na_query_response) {
        throw new BadRequestException('Query Not created');
      }

      if (dept_update) {
        const update_response = await this.prisma.na_form.update({
          where: {
            id: createNaQueryInput.na_formId,
          },
          data: {
            dept_user_id: createNaQueryInput.to_userId,
          },
        });

        if (!update_response) {
          throw new BadRequestException('Form Not updated');
        }
      }
      if (seek_report) {
        const update_response = await this.prisma.na_form.update({
          where: {
            id: createNaQueryInput.na_formId,
          },
          data: {
            seek_report: true,
          },
        });

        if (!update_response) {
          throw new BadRequestException('Form Not updated');
        }
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

  async submitNaQuery(
    id: number,
    createNaQueryInput: CreateNaQueryInput,
    fields: SelectedFields,
  ) {
    try {
      const isexist = await this.prisma.na_query.findFirst({
        where: {
          id: id,
        },
      });

      if (!isexist) {
        throw new BadRequestException('Query Not found');
      }

      const update_response = await this.prisma.na_query.update({
        where: {
          id: id,
        },
        data: {
          query_status: 'REPLIED',
        },
      });

      if (!update_response) {
        throw new BadRequestException('Query Not updated');
      }

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
}
