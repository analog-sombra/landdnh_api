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
        data: { ...data, dept_user_id: 6 },
        select: { id: true, createdById: true, ...fields },
      });

      if (!na_response) {
        throw new BadRequestException('Unable to create NA');
      }

      if (surveys) {
        const survey_reponse = await this.prisma.na_survey.createMany({
          data: surveys.map((survey) => ({
            villageId: survey.villageId,
            area: survey.area,
            sub_division: survey.sub_division,
            survey_no: survey.survey_no,
            createdById: na_response.createdById,
            na_formId: na_response.id,
          })),
        });

        if (!survey_reponse) {
          throw new BadRequestException('Unable to create NA Survey');
        }
      }

      const main_applicant = await this.prisma.na_applicant.create({
        data: {
          villageId: data.villageId,
          firstName: data.q4,
          lastName: '',
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
          q2: true,
          status: true,
          village: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        take: take,
        skip: skip,
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
}
