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
    const {
      dept_update,
      seek_report,
      submit_report,
      allot_hearing,
      noting_draft,
      hearing_schedule,
      hearing,
      intimation_draft,
      ...rest
    } = createNaQueryInput;
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
            ...(createNaQueryInput.to_userId == 6 && {
              office_status: 'SUPERINTENDENT_COLLECTORATE',
            }),
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
      if (noting_draft) {
        const update_response = await this.prisma.na_form.update({
          where: {
            id: createNaQueryInput.na_formId,
          },
          data: {
            dept_status: 'NOTING_DRAFT',
          },
        });

        if (!update_response) {
          throw new BadRequestException('Form Not updated');
        }
      }
      if (hearing_schedule) {
        const update_response = await this.prisma.na_form.update({
          where: {
            id: createNaQueryInput.na_formId,
          },
          data: {
            dept_status: 'HEARING_SCHEDULED',
          },
        });

        if (!update_response) {
          throw new BadRequestException('Form Not updated');
        }
      }
      if (hearing) {
        const update_response = await this.prisma.na_form.update({
          where: {
            id: createNaQueryInput.na_formId,
          },
          data: {
            dept_status: 'HEARING',
          },
        });

        if (!update_response) {
          throw new BadRequestException('Form Not updated');
        }
      }
      if (intimation_draft) {
        const update_response = await this.prisma.na_form.update({
          where: {
            id: createNaQueryInput.na_formId,
          },
          data: {
            dept_status: 'INTIMATION_DRAFT',
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

  async submitSeekReport(naid: number, userid: number) {
    try {
      const na_data = await this.prisma.na_form.findFirst({
        where: {
          id: naid,
          deletedAt: null,
          deletedBy: null,
        },
        include: {
          village: true,
        },
      });
      if (!na_data) {
        throw new BadRequestException('NA Not Found');
      }

      const update_response = await this.prisma.na_form.update({
        where: {
          id: naid,
        },
        data: {
          seek_report: true,
          dept_status: 'SEEK_REPORT',
          dept_user_id: 5,
          office_status: 'MAMLATDAR',
        },
      });

      if (!update_response) {
        throw new BadRequestException('Form Not updated');
      }

      const header = `Attached application/case, papers received from ${na_data.q4} of Village ${na_data.village?.name} for Grant of NA use permission in respect of land bearing survey No.${na_data.q7} (${na_data.q10}) area admeasuring ${na_data.q9}. Out of of ${na_data.q9} HA/Are of Village ${na_data.village?.name} for ${na_data.q12} Purpose,`;

      const dnhpdareport =
        header +
        ' Fd.w.cs. to the MSDNHPDA, Silvassa with a request to kindly offer his comments from planning point of view on the proposed NA use of subject land within a period of 10 days positively.';

      const lroreport =
        header +
        ' Fd.w.cs. to the Land Reforms Officer- I, D&NH, Silvassa with a request to please state whether there is any litigation on the subject land subject to resumption to Govt. and provide details of Occupancy Price Paid by the allottee within a period of 10 days positively.';

      const laqreport =
        header +
        ' Fd.w.cs. to the Land Acquisition Officer, D&NH, Silvassa with a request to please state whether there is any land acquisition proposal on the subject land or land is contemplated to be acquired within a period of 10 days positively.';
      const talathireport =
        header +
        ' Copy to Talathi — Naroli with direction to inquire into the matter and submit his factual report through Circle Officer from revenue point of view within a period of 10 days positively.';

      const dnhpdareport_response = await this.prisma.na_query.create({
        data: {
          createdById: userid,
          from_userId: userid,
          query_status: 'PENDING',
          request_type: 'DEPTTODEPT',
          na_formId: naid,
          type: 'REPORT',
          to_userId: 17,
          query: dnhpdareport,
        },
      });
      if (!dnhpdareport_response) {
        throw new BadRequestException('Report Not created');
      }

      const lroreport_response = await this.prisma.na_query.create({
        data: {
          createdById: userid,
          from_userId: userid,
          query_status: 'PENDING',
          request_type: 'DEPTTODEPT',
          na_formId: naid,
          type: 'REPORT',
          to_userId: 13,
          query: lroreport,
        },
      });

      if (!lroreport_response) {
        throw new BadRequestException('Report Not created');
      }

      const laqreport_response = await this.prisma.na_query.create({
        data: {
          createdById: userid,
          from_userId: userid,
          query_status: 'PENDING',
          request_type: 'DEPTTODEPT',
          na_formId: naid,
          type: 'REPORT',
          to_userId: 14,
          query: laqreport,
        },
      });

      if (!laqreport_response) {
        throw new BadRequestException('Report Not created');
      }

      const talathireport_response = await this.prisma.na_query.create({
        data: {
          createdById: userid,
          from_userId: userid,
          query_status: 'PENDING',
          request_type: 'DEPTTODEPT',
          na_formId: naid,
          type: 'REPORT',
          to_userId: 11,
          query: talathireport,
        },
      });
      if (!talathireport_response) {
        throw new BadRequestException('Report Not created');
      }
      return na_data;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async approveReport(naid: number) {
    try {
      const na_data = await this.prisma.na_form.findFirst({
        where: {
          id: naid,
          deletedAt: null,
          deletedBy: null,
        },
        include: {
          village: true,
        },
      });
      if (!na_data) {
        throw new BadRequestException('NA Not Found');
      }

      const update_response = await this.prisma.na_form.update({
        where: {
          id: naid,
        },
        data: {
          seek_report: true,
          dept_status: 'REPORT_VERIFIED',
        },
      });

      if (!update_response) {
        throw new BadRequestException('Form Not updated');
      }
      return na_data;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }
}
