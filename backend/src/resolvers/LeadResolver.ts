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
import logger from '../utils/logger';

const leadRepository = AppDataSource.getRepository(Lead);

@Resolver(() => Lead)
export class LeadResolver {
  @Query(() => [Lead])
  async leads(): Promise<Lead[]> {
    logger.info('Fetching all leads');
    const leads = await leadRepository.find({
      order: { createdAt: 'DESC' },
    });
    logger.info(`Fetched ${leads.length} leads`);
    return leads;
  }

  @Query(() => Lead, { nullable: true })
  async lead(@Arg('id', () => ID) id: number): Promise<Lead | null> {
    logger.info(`Fetching lead with ID: ${id}`);
    const lead = await leadRepository.findOneBy({ id });

    if (!lead) {
      logger.warn(`Lead not found for ID: ${id}`);
    } else {
      logger.info(`Lead found: ${lead.email}`);
    }

    return lead;
  }

  @Mutation(() => Lead)
  async register(
    @Arg("input") input: RegisterLeadInput
  ): Promise<Lead> {
    try {
      logger.info(`Attempting to register lead with email: ${input.email}`);
      await validateOrReject(input);
    } catch (err) {
      logger.error('Validation failed for lead registration', { errors: err });
      throw err;
    }

    const { name, email, mobile, postcode, services } = input;
    const lead = Lead.create({ name, email, mobile, postcode, services });

    await lead.save();

    logger.info(`Lead registered successfully: ${lead.email} (ID: ${lead.id})`);

    return lead;
  }

}
