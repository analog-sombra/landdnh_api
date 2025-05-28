import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { User } from 'src/user/entities/user.entity';
import { Village } from 'src/village/entities/village.entity';
import { NaApplicant } from '../na_applicant/entities/na_applicant.entity';
import { NaSurvey } from '../na_survey/entities/na_survey.entity';

registerEnumType(Status, {
  name: 'Status',
  description: 'The status of the user',
});

@ObjectType()
export class Na {
  @Field(() => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  villageId: number;

  @Field(() => Village, { nullable: true })
  village: Village;

  @Field(() => Boolean)
  q1: boolean;

  @Field(() => String, { nullable: true })
  q2: string;

  @Field(() => String, { nullable: true })
  q3: string;

  @Field(() => String, { nullable: true })
  anx1: string;

  @Field(() => String, { nullable: true })
  anx2: string;

  @Field(() => String, { nullable: true })
  anx3: string;

  @Field(() => String, { nullable: true })
  anx4: string;

  @Field(() => String, { nullable: true })
  anx5: string;

  @Field(() => String, { nullable: true })
  q4: string;

  @Field(() => String, { nullable: true })
  q5: string;

  @Field(() => String, { nullable: true })
  q6: string;

  @Field(() => String, { nullable: true })
  q7: string;

  @Field(() => String, { nullable: true })
  q8: string;

  @Field(() => String, { nullable: true })
  q9: string;

  @Field(() => String, { nullable: true })
  q10: string;

  @Field(() => String, { nullable: true })
  q11: string;

  @Field(() => String, { nullable: true })
  q12: string;

  @Field(() => String, { nullable: true })
  q13: string;

  @Field(() => String, { nullable: true })
  q14: string;

  @Field(() => String, { nullable: true })
  q15: string;

  @Field(() => String, { nullable: true })
  q16: string;

  @Field(() => String, { nullable: true })
  q17: string;

  @Field(() => String, { nullable: true })
  q18: string;

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

  @Field(() => [NaApplicant], { nullable: true })
  na_applicant: NaApplicant[];

  @Field(() => [NaSurvey], { nullable: true })
  na_survey: NaSurvey[];

  @Field(() => User)
  dept_user_id: User;

  @Field(() => Boolean)
  seek_report: boolean;
}
