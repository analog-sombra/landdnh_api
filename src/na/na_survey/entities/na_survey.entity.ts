import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { Na } from 'src/na/entities/na.entity';
import { User } from 'src/user/entities/user.entity';
import { Village } from 'src/village/entities/village.entity';

@ObjectType()
export class NaSurvey {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  survey_no: string;

  @Field(() => String, { nullable: true })
  area: string;

  @Field(() => String, { nullable: true })
  sub_division: string;

  @Field(() => Int)
  villageId: number;

  @Field(() => Village)
  village: Village;

  @Field(() => Int)
  na_formId: number;

  @Field(() => Na)
  na_form: Na;

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
