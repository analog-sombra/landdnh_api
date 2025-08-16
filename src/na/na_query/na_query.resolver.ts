import { Resolver, Mutation, Query, Args, Info, Int } from '@nestjs/graphql';
import { NaQueryService } from './na_query.service';
import { NaQuery } from './entities/na_query.entity';
import { CreateNaQueryInput } from './dto/create-na_query.input';
import { getSelectedFields } from 'src/utils/methods';
import { GraphQLResolveInfo } from 'graphql';
import {} from '@nestjs/common';
import { QueryType } from '@prisma/client';
import { Na } from '../entities/na.entity';

@Resolver(() => NaQuery)
export class NaQueryResolver {
  constructor(private readonly naQueryService: NaQueryService) {}

  @Mutation(() => NaQuery)
  createNaQuery(
    @Args('createNaQueryInput') createNaQueryInput: CreateNaQueryInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naQueryService.createNaQuery(createNaQueryInput, fields);
  }

  @Query(() => [NaQuery])
  getQueryByType(
    @Args('id', { type: () => Int }) id: number,
    @Args('querytype', { type: () => [QueryType] }) querytype: [QueryType],
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naQueryService.getQueryByType(id, querytype, fields);
  }

  @Mutation(() => NaQuery)
  submitNaQuery(
    @Args('id', { type: () => Int }) id: number,
    @Args('createNaQueryInput') createNaQueryInput: CreateNaQueryInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naQueryService.submitNaQuery(id, createNaQueryInput, fields);
  }

  @Query(() => [NaQuery])
  allReportReceived(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naQueryService.allReportReceived(id, fields);
  }

  @Query(() => [NaQuery])
  reportReceivedStatus(
    @Args('id', { type: () => Int }) id: number,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naQueryService.reportReceivedStatus(id, fields);
  }

  @Mutation(() => NaQuery)
  hearingScheduleNaQuery(
    @Args('createNaQueryInput') createNaQueryInput: CreateNaQueryInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naQueryService.hearingScheduleNaQuery(
      createNaQueryInput,
      fields,
    );
  }

  @Mutation(() => NaQuery)
  hearingReScheduleNaQuery(
    @Args('createNaQueryInput') createNaQueryInput: CreateNaQueryInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    const fields = getSelectedFields(info);
    return this.naQueryService.hearingReScheduleNaQuery(
      createNaQueryInput,
      fields,
    );
  }

  @Mutation(() => Na)
  submitSeekReport(
    @Args('naid', { type: () => Int }) naid: number,
    @Args('userid', { type: () => Int }) userid: number,
  ) {
    return this.naQueryService.submitSeekReport(naid, userid);
  }

  @Mutation(() => Na)
  approveReport(@Args('naid', { type: () => Int }) naid: number) {
    return this.naQueryService.approveReport(naid);
  }
}
