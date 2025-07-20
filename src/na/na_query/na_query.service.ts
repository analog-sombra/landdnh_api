import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNaQueryInput } from './dto/create-na_query.input';
import { SelectedFields } from 'src/utils/methods';
import { PrismaService } from 'prisma/prisma.service';
import { QueryType, RequestType } from '@prisma/client';

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
      apply_sanad,
      ...rest
    } = createNaQueryInput;
    try {
      const na_data = await this.prisma.na_form.findFirst({
        where: {
          id: createNaQueryInput.na_formId,
          deletedAt: null,
          deletedBy: null,
        },
        include: {
          village: true,
        },
      });

      if (!na_data) {
        throw new BadRequestException('NA Form Not Found');
      }

      const to_user = await this.prisma.user.findFirst({
        where: {
          id: createNaQueryInput.to_userId,
        },
      });

      if (!to_user) {
        throw new BadRequestException('User Not Found');
      }

      const from_user = await this.prisma.user.findFirst({
        where: {
          id: createNaQueryInput.from_userId,
        },
      });

      if (!from_user) {
        throw new BadRequestException('User Not Found');
      }

      if (
        from_user.role == 'LDCMAMLATDAR' &&
        to_user.role == 'USER' &&
        na_data.dept_status == 'HEARING_SCHEDULED'
      ) {
        const date_of_hearing = await this.prisma.na_query.findFirst({
          where: {
            na_formId: createNaQueryInput.na_formId,
            type: QueryType.HEARING_SCHEDULED,
            deletedAt: null,
            deletedBy: null,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
        if (!date_of_hearing) {
          throw new BadRequestException('Hearing Date Not Found');
        }

        const data_to_update = {
          ...rest,
          request_type: RequestType.DEPTTOAPPL,
          type: QueryType.UPDATES,
        };
        const na_query_response = await this.prisma.na_query.create({
          data: data_to_update,
          select: fields,
        });
        if (!na_query_response) {
          throw new BadRequestException('Query Not created');
        }

        const dept_query_response = await this.prisma.na_query.create({
          data: {
            to_userId: createNaQueryInput.to_userId,
            from_userId: createNaQueryInput.from_userId,
            request_type: RequestType.DEPTTODEPT,
            createdById: createNaQueryInput.createdById,
            query_status: 'PENDING',
            type: QueryType.CORESPONDENCE,
            na_formId: createNaQueryInput.na_formId,
            query: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"The Hon'ble collector has scheduled a hearing on the land bearing survey No.${na_data.q7} (old srv no. ${na_data.q10}) area admeasuring ${na_data.q9} HA/Are. Out of ${na_data.q11} HA/Are of Village ${na_data.village?.name} for ${na_data.q12} Purpose on ${date_of_hearing.query}","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"code","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
          },
        });
        if (!dept_query_response) {
          throw new BadRequestException('Query Not created');
        }

        const na_update = await this.prisma.na_form.update({
          where: {
            id: createNaQueryInput.na_formId,
          },
          data: {
            dept_user_id: 3,
            form_status: 'HEARING_SCHEDULED',
          },
        });
        if (!na_update) {
          throw new BadRequestException('Form Not updated');
        }

        return na_query_response;
      }
      if (
        from_user.role == 'COLLECTOR' &&
        to_user.role == 'PATOCOLLECTOR' &&
        na_data.dept_status == 'HEARING_SCHEDULED'
      ) {
        const na_query_response = await this.prisma.na_query.create({
          data: {
            ...rest,
          },
          select: fields,
        });
        if (!na_query_response) {
          throw new BadRequestException('Query Not created');
        }

        const update_response = await this.prisma.na_form.update({
          where: {
            id: createNaQueryInput.na_formId,
          },
          data: {
            dept_user_id: createNaQueryInput.to_userId,
            office_status: 'COLLECTOR',
            dept_status: 'ALLOT_HEARING',
          },
        });

        if (!update_response) {
          throw new BadRequestException('Form Not updated');
        }
      } else if (
        from_user.role == 'LDCMAMLATDAR' &&
        to_user.role == 'USER' &&
        na_data.dept_status == 'INTIMATION_DRAFT'
      ) {
        const data_to_update = {
          ...rest,
          request_type: RequestType.DEPTTOAPPL,
          type: QueryType.UPDATES,
        };
        const na_query_response = await this.prisma.na_query.create({
          data: data_to_update,
          select: fields,
        });
        if (!na_query_response) {
          throw new BadRequestException('Query Not created');
        }

        const dept_query_response = await this.prisma.na_query.create({
          data: {
            to_userId: 5,
            from_userId: createNaQueryInput.from_userId,
            request_type: RequestType.DEPTTODEPT,
            createdById: createNaQueryInput.createdById,
            query_status: 'PENDING',
            type: QueryType.CORESPONDENCE,
            na_formId: createNaQueryInput.na_formId,
            query: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Intimation order for the land bearing survey No.${na_data.q7} (old srv no. ${na_data.q10}) area admeasuring ${na_data.q9} HA/Are. Out of ${na_data.q11} HA/Are of Village ${na_data.village?.name} for ${na_data.q12} Purpose has been drafted and conveyed to the concerned parties.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"code","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
          },
        });
        if (!dept_query_response) {
          throw new BadRequestException('Query Not created');
        }

        return na_query_response;
      } else {
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
          if (to_user.role == 'USER') {
            const update_response = await this.prisma.na_form.update({
              where: {
                id: createNaQueryInput.na_formId,
              },
              data: {
                dept_user_id: 5,
                ...(createNaQueryInput.to_userId == 6 && {
                  office_status: 'SUPERINTENDENT_COLLECTORATE',
                }),
              },
            });

            if (!update_response) {
              throw new BadRequestException('Form Not updated');
            }
          } else {
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
            include: {
              village: true,
            },
          });

          if (!update_response) {
            throw new BadRequestException('Form Not updated');
          }

          const query = `{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"REPORT ON OBJECTIONS RECEIVED","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"On Verification of the available records of objection,it is in confirmed that there is No Objection respect of land bearing survey No.${update_response.q7} (old srv no. ${update_response.q10}) area admeasuring ${update_response.q9} HA/Are. Out of ${update_response.q11} HA/Are of Village ${update_response.village?.name} for ${update_response.q12} Purpose","type":"text","version":1}],"direction":"ltr","format":"left","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":"ltr","format":"center","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":"ltr","format":"center","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"code","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;

          const createQuery = await this.prisma.na_query.create({
            data: {
              createdById: createNaQueryInput.createdById,
              from_userId: createNaQueryInput.from_userId,
              query_status: 'PENDING',
              request_type: 'DEPTTODEPT',
              na_formId: createNaQueryInput.na_formId,
              type: 'CORESPONDENCE',
              to_userId: 5,
              query: query,
            },
          });
          if (!createQuery) {
            throw new BadRequestException('Query Not created');
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
              office_status: 'RDC',
              dept_user_id: 4,
            },
          });

          if (!update_response) {
            throw new BadRequestException('Form Not updated');
          }

          const createQuery = await this.prisma.na_query.create({
            data: {
              createdById: createNaQueryInput.createdById,
              from_userId: 3,
              query_status: 'PENDING',
              request_type: 'DEPTTODEPT',
              na_formId: createNaQueryInput.na_formId,
              type: 'CORESPONDENCE',
              to_userId: 4,
              query:
                '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Hearing was conducted and intimation order be prepared accordingly.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"code","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}',
            },
          });
          if (!createQuery) {
            throw new BadRequestException('Query Not created');
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
        if (apply_sanad) {
          const update_response = await this.prisma.na_form.update({
            where: {
              id: createNaQueryInput.na_formId,
            },
            data: {
              dept_status: 'APPLY_SANAD',
            },
          });

          if (!update_response) {
            throw new BadRequestException('Form Not updated');
          }
        }
        return na_query_response;
      }
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
        orderBy: {
          updatedAt: 'desc',
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
          // query: `The Hon'ble Collector has scheduled a hearing for the case on ${createNaQueryInput.query}. Prepare the Hearing Notice and send it to the concerned parties.`,
          query: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"The Hon'ble Collector has scheduled a hearing for the case on ${createNaQueryInput.query}. Prepare the Hearing Notice and send it to the concerned parties.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"code","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
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
            dept_status: 'HEARING_SCHEDULED',
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

      const dnhpdareport = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Attached application/case, papers received from ${na_data.q4} of Village ${na_data.village?.name} for Grant of NA use permission in respect of land bearing survey No.${na_data.q7} (old srv no. ${na_data.q10}) area admeasuring ${na_data.q9} HA/Are. Out of ${na_data.q11} HA/Are of Village ${na_data.village?.name} for ${na_data.q12} Purpose,","type":"text","version":1},{"type":"linebreak","version":1},{"type":"linebreak","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"Fd.w.cs.","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" to the ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"MSDNHPDA","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":", Silvassa with a request to kindly offer his comments from planning point of view on the proposed NA use of subject land within a period of 10 days positively.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"code","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;

      const lroreport = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Attached application/case, papers received from ${na_data.q4} of Village ${na_data.village?.name} for Grant of NA use permission in respect of land bearing survey No.${na_data.q7} (old srv no. ${na_data.q10}) area admeasuring ${na_data.q9} HA/Are. Out of ${na_data.q11} HA/Are of Village ${na_data.village?.name} for ${na_data.q12} Purpose,","type":"text","version":1},{"type":"linebreak","version":1},{"type":"linebreak","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"Fd.w.cs.","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" to the ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"Land Reforms Officer- I, D&NH,","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" Silvassa with a request to please state whether there is any litigation on the subject land subject to resumption to Govt. and provide details of Occupancy Price Paid by the allottee within a period of 10 days positively.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"code","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;

      const lroadditionla = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"To,","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"        The Land Reforms Officer-1,","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"        Dadra and Nager Haveli,","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"        Silvassa.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Subject:-","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" Application for grant of NA use permission in respect of land bearing survey No.${na_data.q7} (old srv no. ${na_data.q10}) area admeasuring ${na_data.q9} HA/Are. Out of ${na_data.q11} HA/Are of Village ${na_data.village?.name} for ${na_data.q12} Purpose in favour of ${na_data.q4}- ${na_data.last_name} of village ${na_data.village?.name}.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":1,"textStyle":""},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"Ref. No. : Order No. LRO-I/B-1/601(30)/DNH LAND/2023/975. dated: 22/11/2024 passed by the Collector, DNH","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":1,"textStyle":""},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Sir, ","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"        As per Order No. LRO-I/B-1/601(30)/DNH LAND/2023/975, dated: 22/11/2024, the Collector, DNH has directed to collect the Form - I {See rule 6(i)] of DNH Land Reforms 1971. Accordingly, the applicant has submitted FORM-I [See rule 6 (i)]. The details of land submitted by the applicant in FORM-I [See rule 6(i)] in enclosed herewith.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"        This is for your kind information please.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;

      const laqreport = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Attached application/case, papers received from ${na_data.q4} of Village ${na_data.village?.name} for Grant of NA use permission in respect of land bearing survey No.${na_data.q7} (old srv no. ${na_data.q10}) area admeasuring ${na_data.q9} HA/Are. Out of ${na_data.q11} HA/Are of Village ${na_data.village?.name} for ${na_data.q12} Purpose,","type":"text","version":1},{"type":"linebreak","version":1},{"type":"linebreak","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"Fd.w.cs.","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" to the ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"Land Acquisition Officer, D&NH,","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" Silvassa with a request to please state whether there is any land acquisition proposal on the subject land or land is contemplated to be acquired within a period of 10 days positively.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"code","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;

      const talathireport = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Attached application/case, papers received from ${na_data.q4} of Village ${na_data.village?.name} for Grant of NA use permission in respect of land bearing survey No.${na_data.q7} (old srv no. ${na_data.q10}) area admeasuring ${na_data.q9} HA/Are. Out of ${na_data.q11} HA/Are of Village ${na_data.village?.name} for ${na_data.q12} Purpose,","type":"text","version":1},{"type":"linebreak","version":1},{"type":"linebreak","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":"Copy to ","type":"text","version":1},{"detail":0,"format":1,"mode":"normal","style":"","text":"Talathi — Naroli","type":"text","version":1},{"detail":0,"format":0,"mode":"normal","style":"","text":" with direction to inquire into the matter and submit his factual report through Circle Officer from revenue point of view within a period of 10 days positively.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"code","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;

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
      const lroadditionla_response = await this.prisma.na_query.create({
        data: {
          createdById: userid,
          from_userId: userid,
          query_status: 'PENDING',
          request_type: 'DEPTTODEPT',
          na_formId: naid,
          type: 'REPORT',
          to_userId: 13,
          query: lroadditionla,
        },
      });

      if (!lroadditionla_response) {
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

      // const query_response = await this.prisma.na_query.create({
      //   data: {
      //     createdById: na_data.createdById,
      //     from_userId: 8,
      //     query_status: 'PENDING',
      //     request_type: 'DEPTTODEPT',
      //     na_formId: naid,
      //     type: 'CORESPONDENCE',
      //     to_userId: 5,
      //     // query: `On verificaion of the available records of objection, it is confirmed that there is No objection respect of land bearing survey No.${na_data.q7} (old srv no. ${na_data.q10}) area admeasuring ${na_data.q9} HA/Are of Village ${na_data.village?.name} for ${na_data.q12} Purpose.`,
      //     query: `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"On verificaion of the available records of objection, it is confirmed that there is No objection respect of land bearing survey No.${na_data.q7} (old srv no. ${na_data.q10}) area admeasuring ${na_data.q9} HA/Are of Village ${na_data.village?.name} for ${na_data.q12} Purpose.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"code","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
      //   },
      // });

      // if (!query_response) {
      //   throw new BadRequestException('Query Not created');
      // }

      return na_data;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }
}
