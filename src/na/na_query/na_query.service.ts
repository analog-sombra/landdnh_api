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
    const { dept_update, seek_report, submit_report, allot_hearing, ...rest } =
      createNaQueryInput;
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
            dept_status: 'SEEK_REPORT',
          },
        });

        if (!update_response) {
          throw new BadRequestException('Form Not updated');
        }
      }

      if (submit_report) {
        const update_response = await this.prisma.na_form.update({
          where: {
            id: createNaQueryInput.na_formId,
          },
          data: {
            dept_status: 'REPORT_VERIFIED',
          },
        });

        if (!update_response) {
          throw new BadRequestException('Form Not updated');
        }
      }
      if (allot_hearing) {
        const update_response = await this.prisma.na_form.update({
          where: {
            id: createNaQueryInput.na_formId,
          },
          data: {
            dept_status: 'ALLOT_HEARING',
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

  async allReportReceived(id: number, fields: SelectedFields) {
    try {
      const all_seek_report_response = await this.prisma.na_query.findMany({
        where: {
          na_formId: id,
          type: QueryType.REPORT,
          deletedAt: null,
          deletedBy: null,
          status: 'ACTIVE',
        },
        select: fields,
      });
      if (!all_seek_report_response) {
        throw new BadRequestException('No Reports Found');
      }

      const all_submit_report_response = await this.prisma.na_query.findMany({
        where: {
          na_formId: id,
          type: QueryType.SUBMITREPORT,
          deletedAt: null,
          deletedBy: null,
          status: 'ACTIVE',
        },
        select: fields,
      });

      if (
        all_seek_report_response.length !== all_submit_report_response.length
      ) {
        throw new BadRequestException('Not all reports have been submitted');
      }

      return [...all_seek_report_response, ...all_submit_report_response];
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async hearingScheduleNaQuery(
    createNaQueryInput: CreateNaQueryInput,
    fields: SelectedFields,
  ) {
    const { dept_update, ...rest } = createNaQueryInput;
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

      const noting_query_response = await this.prisma.na_query.create({
        data: {
          query: `The Hon'ble Collector has scheduled a hearing for the case on ${createNaQueryInput.query}. Prepare the Hearing Notice and send it to the concerned parties.`,
          from_userId: createNaQueryInput.from_userId,
          to_userId: createNaQueryInput.to_userId,
          na_formId: createNaQueryInput.na_formId,
          type: QueryType.CORESPONDENCE,
          createdById: createNaQueryInput.createdById,
          request_type: 'DEPTTODEPT',
          query_status: 'PENDING',
        },
        select: fields,
      });
      if (!noting_query_response) {
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

      return na_query_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }
  async hearingReScheduleNaQuery(
    createNaQueryInput: CreateNaQueryInput,
    fields: SelectedFields,
  ) {
    const { dept_update, ...rest } = createNaQueryInput;
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

      return na_query_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }
}
