import { ObjectType, Field, Int } from '@nestjs/graphql';
import { QueryStatus, QueryType, RequestType, Status } from '@prisma/client';
import { Na } from 'src/na/entities/na.entity';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class NaQuery {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  na_formId: number;

  @Field(() => Na)
  na_form: Na;

  @Field(() => QueryType)
  type: QueryType;

  @Field(() => Int)
  from_userId: number;

  @Field(() => User)
  from_user: User;

  @Field(() => Int)
  to_userId: number;

  @Field(() => User)
  to_user: User;

  @Field(() => RequestType)
  request_type: RequestType;

  @Field(() => QueryStatus)
  query_status: QueryStatus;

  @Field(() => String)
  query: string;

  @Field(() => String, { nullable: true })
  upload_url_1: string;

  @Field(() => String, { nullable: true })
  upload_url_2: string;

  @Field(() => String, { nullable: true })
  upload_url_3: string;

  @Field(() => String, { nullable: true })
  upload_url_4: string;

  @Field(() => String, { nullable: true })
  upload_url_5: string;

  @Field(() => Status)
  status: Status;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Int, { nullable: true })
  createdById: number;

  @Field(() => User, { nullable: true })
  createdBy: User;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Int, { nullable: true })
  updatedById: number;

  @Field(() => User, { nullable: true })
  updatedBy: User;

  @Field(() => Date, { nullable: true })
  deletedAt: Date;

  @Field(() => Int, { nullable: true })
  deletedById: number;

  @Field(() => User, { nullable: true })
  deletedBy: User;
}
