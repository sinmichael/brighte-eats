import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ID,
} from 'type-graphql';
import { Lead } from '../entities/Lead';
import { AppDataSource } from '../utils/database';
import { RegisterLeadInput } from '../inputs/RegisterLeadInput';
import { validateOrReject } from 'class-validator';

const leadRepository = AppDataSource.getRepository(Lead);

@Resolver(() => Lead)
export class LeadResolver {
  @Query(() => [Lead])
  async leads(): Promise<Lead[]> {
    return await leadRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  @Query(() => Lead, { nullable: true })
  async lead(@Arg('id', () => ID) id: number): Promise<Lead | null> {
    return await leadRepository.findOneBy({ id });
  }

    @Mutation(() => Lead)
  async register(
    @Arg("input") input: RegisterLeadInput
  ): Promise<Lead> {
    await validateOrReject(input);

    const { name, email, mobile, postcode, services } = input;
    const lead = Lead.create({ name, email, mobile, postcode, services });
    await lead.save();
    return lead;
  }

}
