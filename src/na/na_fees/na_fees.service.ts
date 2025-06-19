import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNaFeeInput } from './dto/create-na_fee.input';
import { PrismaService } from 'prisma/prisma.service';
import { SelectedFields } from 'src/utils/methods';
import { UpdateNaFeeInput } from './dto/update-na_fee.input';

@Injectable()
export class NaFeesService {
  constructor(private readonly prisma: PrismaService) {}

  async createNaFee(
    createNaFeeInput: CreateNaFeeInput,
    fields: SelectedFields,
  ) {
    try {
      const isExist = await this.prisma.na_form.findFirst({
        where: {
          id: createNaFeeInput.na_formId,
          deletedAt: null,
          deletedBy: null,
        },
      });

      if (!isExist) {
        throw new BadRequestException('Form does not exist');
      }

      const na_fee_response = await this.prisma.na_fees.create({
        data: {
          ...createNaFeeInput,
          is_paid: false,
        },
        select: fields,
      });

      if (!na_fee_response) {
        throw new BadRequestException('Fee Not created');
      }

      return na_fee_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async getPendingNaFee(id: number, fields: SelectedFields) {
    try {
      const pending_na_fee = await this.prisma.na_fees.findMany({
        where: {
          na_formId: id,
          is_paid: false,
          deletedAt: null,
          deletedBy: null,
        },
        select: fields,
      });

      if (!pending_na_fee || pending_na_fee.length === 0) {
        throw new BadRequestException('No pending fees found');
      }

      return pending_na_fee;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async getFeesHistory(id: number, fields: SelectedFields) {
    try {
      const fees_history = await this.prisma.na_fees.findMany({
        where: {
          na_formId: id,
          deletedAt: null,
          deletedBy: null,
        },
        select: fields,
      });

      if (!fees_history || fees_history.length === 0) {
        throw new BadRequestException('No fees history found');
      }

      return fees_history;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }

  async payNaFee(updateNaFeeInput: UpdateNaFeeInput, fields: SelectedFields) {
    try {
      const isExist = await this.prisma.na_fees.findFirst({
        where: {
          id: updateNaFeeInput.id,
          deletedAt: null,
          deletedBy: null,
        },
      });

      if (!isExist) {
        throw new BadRequestException('Fee does not exist');
      }

      const na_fee_response = await this.prisma.na_fees.update({
        where: {
          id: updateNaFeeInput.id,
        },
        data: {
          status: 'PAID',
          is_paid: true,
          track_id: updateNaFeeInput.track_id,
          transaction_id: updateNaFeeInput.transaction_id,
          transaction_date: new Date().toISOString(),
          order_id: updateNaFeeInput.order_id,
          updatedById: updateNaFeeInput.updatedById,
        },
        select: fields,
      });

      if (!na_fee_response) {
        throw new BadRequestException('Fee Not updated');
      }

      return na_fee_response;
    } catch (error) {
      throw new BadRequestException(`error: ${error}`);
    }
  }
}
