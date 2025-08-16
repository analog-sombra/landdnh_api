import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNaInput } from './dto/create-na.input';
import { PrismaService } from 'prisma/prisma.service';
import { SelectedFields } from 'src/utils/methods';
import { UpdateNaInput } from './dto/update-na.input';

@Injectable()
export class NaService {
  constructor(private readonly prisma: PrismaService) {}

  async createNa(createNaInput: CreateNaInput, fields: SelectedFields) {
    try {
      const { surveys, applicants, ...data } = createNaInput;

      const na_response = await this.prisma.na_form.create({
        data: { ...data, dept_user_id: 10 },
        select: { id: true, createdById: true, ...fields },
      });

      if (!na_response) {
        throw new BadRequestException('Unable to create NA');
      }

      const get_na = await this.prisma.na_form.findFirst({
        where: {
          id: na_response.id,
        },
      });

      if (!get_na) {
        throw new BadRequestException('NA Not Found');
      }

      const main_applicant = await this.prisma.na_applicant.create({
        data: {
          villageId: data.villageId,
          firstName: data.q4,
          lastName: data.last_name,
          address: data.q5,
          contact: data.q6,
          relation: 'self',
          na_formId: na_response.id,
          is_main: true,
        },
      });

      const main_survey = await this.prisma.na_survey.create({
        data: {
          villageId: data.villageId,
          survey_no: data.q7,
          sub_division: data.q8,
          area: data.q9,
          createdById: na_response.createdById,
          na_formId: na_response.id,
        },
      });

      if (!main_survey) {
        throw new BadRequestException('Unable to create NA Survey');
      }

      if (!main_applicant) {
        throw new BadRequestException('Unable to create NA Applicant');
      }

      if (surveys) {
        const survey_reponse = await this.prisma.na_survey.createMany({
          data: surveys.map((survey) => ({
            villageId: data.villageId,
            area: survey.area,
            sub_division:
              survey.sub_division == null
                ? 'Not Applicable'
                : survey.sub_division,
            survey_no: survey.survey_no,
            createdById: na_response.createdById,
            na_formId: na_response.id,
          })),
        });

        if (!survey_reponse) {
          throw new BadRequestException('Unable to create NA Survey');
        }
      }

      if (applicants) {
        const applicant_response = await this.prisma.na_applicant.createMany({
          data: applicants.map((applicant) => ({
            villageId: data.villageId,
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            contact: applicant.contact,
            relation: applicant.relation,
            signature_url: applicant.signature_url,
            na_formId: na_response.id,
          })),
        });

        if (!applicant_response) {
          throw new BadRequestException('Unable to create NA Applicant');
        }
      }

      const date = new Date(get_na.createdAt)
        .toLocaleDateString('en-GB')
        .replace(/\//g, '-');
      const name = data.q4;
      const address = data.q5;
      // Calculate current date + 120 days in dd-mm-yyyy format
      const dueDateObj = new Date(get_na.createdAt);
      dueDateObj.setDate(dueDateObj.getDate() + 120);
      const dueDate = dueDateObj
        .toLocaleDateString('en-GB')
        .replace(/\//g, '-');

      const query =
        `{"root":{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Computerized Application Monitoring System","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"UT ADMINISTRATION OF DADRA & NAGAR HAVELI AND DAMAN & DIU","type":"text","version":1}],"direction":"ltr","format":"center","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[],"direction":null,"format":"left","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Date: ${date}                                    Client Copy","type":"text","version":1}],"direction":"ltr","format":"left","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"ACK No: ${get_na.id}                               (to be retained by Client)","type":"text","version":1}],"direction":"ltr","format":"left","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Name","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"tablecell","version":1,"backgroundColor":null,"colSpan":1,"headerState":0,"rowSpan":1},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${get_na.q4} ${get_na.last_name}","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"tablecell","version":1,"backgroundColor":null,"colSpan":1,"headerState":0,"rowSpan":1},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Application Date","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"tablecell","version":1,"backgroundColor":null,"colSpan":1,"headerState":0,"rowSpan":1},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${date}","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"tablecell","version":1,"backgroundColor":null,"colSpan":1,"headerState":0,"rowSpan":1}],"direction":"ltr","format":"","indent":0,"type":"tablerow","version":1},{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Department","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"tablecell","version":1,"backgroundColor":null,"colSpan":1,"headerState":0,"rowSpan":1},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Mamlatdar II","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"tablecell","version":1,"backgroundColor":null,"colSpan":1,"headerState":0,"rowSpan":1},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Due Date","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"tablecell","version":1,"backgroundColor":null,"colSpan":1,"headerState":0,"rowSpan":1},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${dueDate}","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"tablecell","version":1,"backgroundColor":null,"colSpan":1,"headerState":0,"rowSpan":1}],"direction":"ltr","format":"","indent":0,"type":"tablerow","version":1},{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Applied For","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"tablecell","version":1,"backgroundColor":null,"colSpan":1,"headerState":0,"rowSpan":1},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"App. FOR GRANT OF N.A.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"tablecell","version":1,"backgroundColor":null,"colSpan":3,"headerState":0,"rowSpan":1}],"direction":"ltr","format":"","indent":0,"type":"tablerow","version":1},{"children":[{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Address","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"tablecell","version":1,"backgroundColor":null,"colSpan":1,"headerState":0,"rowSpan":1},{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${get_na.q5}","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"tablecell","version":1,"backgroundColor":null,"colSpan":3,"headerState":0,"rowSpan":1}],"direction":"ltr","format":"","indent":0,"type":"tablerow","version":1}],"direction":"ltr","format":"","indent":0,"type":"table","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"PRO,CAMS Designed at Silvassa","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":"ltr","format":"","indent":0,"type":"code","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`
          .replace(/\${date}/g, date)
          .replace(/\${dueDate}/g, dueDate)
          .replace(/\${name}/g, name)
          .replace(/\${address}/g, address);

      const na_query = await this.prisma.na_query.create({
        data: {
          createdById: createNaInput.createdById,
          from_userId: 6,
          query_status: 'PENDING',
          request_type: 'DEPTTOAPPL',
          na_formId: get_na.id,
          type: 'UPDATES',
          to_userId: createNaInput.createdById,
          query: query,
        },
      });

      if (!na_query) {
        throw new BadRequestException('Unable to create NA Query');
      }

      return na_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async getNaById(id: number, fields: SelectedFields) {
    try {
      const na_response = await this.prisma.na_form.findFirst({
        where: {
          id: id,
          status: 'ACTIVE',
          deletedAt: null,
          deletedBy: null,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        select: fields,
      });

      if (!fields) {
        throw new BadRequestException('NA Not Found');
      }

      return na_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async getAllUserNa(
    id: number,
    take: number,
    skip: number,
    fields: SelectedFields,
  ) {
    try {
      const na_response = await this.prisma.na_form.findMany({
        where: {
          status: 'ACTIVE',
          deletedAt: null,
          deletedBy: null,
          createdById: id,
        },
        select: {
          id: true,
          q4: true,
          status: true,
          office_status: true,
          form_status: true,
          dept_status: true,
          dept_user: {
            select: {
              role: true,
              id: true,
            },
          },
          village: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        take: take,
        skip: skip,
        orderBy: {
          updatedAt: 'desc',
        },
      });

      const total = await this.prisma.na_form.count({
        where: {
          status: 'ACTIVE',
          deletedAt: null,
          deletedBy: null,
        },
      });

      if (!fields) {
        throw new BadRequestException('NA Not Found');
      }

      return { data: na_response, total, skip, take };
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async getAllNa(take: number, skip: number, fields: SelectedFields) {
    try {
      const na_response = await this.prisma.na_form.findMany({
        where: {
          status: 'ACTIVE',
          deletedAt: null,
          deletedBy: null,
        },
        select: {
          id: true,
          q4: true,
          status: true,
          office_status: true,
          form_status: true,
          dept_status: true,
          updatedAt: true,
          dept_user: {
            select: {
              role: true,
              id: true,
            },
          },
          village: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        take: take,
        skip: skip,
        orderBy: {
          updatedAt: 'desc',
        },
      });

      const total = await this.prisma.na_form.count({
        where: {
          status: 'ACTIVE',
          deletedAt: null,
          deletedBy: null,
        },
      });

      if (!fields) {
        throw new BadRequestException('NA Not Found');
      }

      return { data: na_response, total, skip, take };
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async getAllDepartmentNa(
    all: boolean,
    userId: number,
    role: string,
    take: number,
    skip: number,
    fields: SelectedFields,
  ) {
    try {
      if (all) {
        const na_response = await this.prisma.na_form.findMany({
          where: {
            status: 'ACTIVE',
            deletedAt: null,
            deletedBy: null,
            form_status: {
              not: 'DRAFT',
            },
          },
          select: {
            id: true,
            q4: true,
            status: true,
            office_status: true,
            form_status: true,
            dept_status: true,
            dept_user: {
              select: {
                role: true,
                id: true,
              },
            },
            village: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          take: take,
          skip: skip,
          orderBy: {
            updatedAt: 'desc',
          },
        });

        const total = await this.prisma.na_form.count({
          where: {
            status: 'ACTIVE',
            deletedAt: null,
            deletedBy: null,
            form_status: {
              not: 'DRAFT',
            },
          },
        });

        if (!fields) {
          throw new BadRequestException('NA Not Found');
        }

        return { data: na_response, total, skip, take };
      } else {
        const allowedRoles: string[] = ['TALATHI', 'DNHPDA', 'LAQ', 'LRO'];
        const na_response = await this.prisma.na_form.findMany({
          where: {
            status: 'ACTIVE',
            deletedAt: null,
            deletedBy: null,
            form_status: {
              not: 'DRAFT',
            },
            OR: [
              {
                dept_user: {
                  id: userId,
                },
              },
              {
                dept_status: 'SEEK_REPORT',
                ...(allowedRoles.includes(role) && {}),
              },
            ],
          },
          select: {
            id: true,
            q4: true,
            status: true,
            office_status: true,
            form_status: true,
            dept_status: true,
            dept_user: {
              select: {
                role: true,
                id: true,
              },
            },
            village: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          take: take,
          skip: skip,
          orderBy: {
            updatedAt: 'desc',
          },
        });

        const total = await this.prisma.na_form.count({
          where: {
            status: 'ACTIVE',
            deletedAt: null,
            deletedBy: null,
            form_status: {
              not: 'DRAFT',
            },
            OR: [
              {
                dept_user: {
                  id: userId,
                },
              },
              {
                dept_status: 'SEEK_REPORT',
                ...(allowedRoles.includes(role) && {}),
              },
            ],
          },
        });

        if (!fields) {
          throw new BadRequestException('NA Not Found');
        }

        return { data: na_response, total, skip, take };
      }
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async updateNa(updateNaInput: UpdateNaInput, fields: SelectedFields) {
    try {
      const is_na_exists = await this.prisma.na_form.findFirst({
        where: {
          id: updateNaInput.id,
          deletedAt: null,
          deletedBy: null,
        },
      });

      if (!is_na_exists) {
        throw new BadRequestException('NA Not Found');
      }

      const { id, ...updateData } = updateNaInput;

      const na_response = await this.prisma.na_form.update({
        where: {
          id: id,
        },
        data: updateData,
        select: fields,
      });

      if (!fields) {
        throw new BadRequestException('Unable to update NA');
      }

      return na_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async submitNaById(id: number, fields: SelectedFields) {
    try {
      const is_na_exists = await this.prisma.na_form.findFirst({
        where: {
          id: id,
          deletedAt: null,
          deletedBy: null,
        },
      });

      if (!is_na_exists) {
        throw new BadRequestException('NA Not Found');
      }

      const na_response = await this.prisma.na_form.update({
        where: {
          id: id,
        },
        data: {
          form_status: 'SUBMITTED',
        },
        select: fields,
      });

      if (!na_response) {
        throw new BadRequestException('Unable to submit NA');
      }

      return na_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }
}
