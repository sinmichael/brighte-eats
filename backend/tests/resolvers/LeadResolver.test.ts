import 'reflect-metadata';
import { LeadResolver } from '../../src/resolvers/LeadResolver';
import { RegisterLeadInput } from '../../src/inputs/RegisterLeadInput';
import { Lead } from '../../src/entities/Lead';
import { validateOrReject } from 'class-validator';
import { ValidationError } from 'class-validator';

jest.mock('../../src/utils/database', () => {
  const mockLeadRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  return {
    AppDataSource: {
      getRepository: () => mockLeadRepository,
    },
    __mockLeadRepository: mockLeadRepository,
  };
});

jest.mock('../../src/entities/Lead', () => ({
  Lead: {
    create: jest.fn(),
  },
}));

jest.mock('class-validator', () => ({
  ...jest.requireActual('class-validator'),
  validateOrReject: jest.fn(),
}));

const { __mockLeadRepository } = require('../../src/utils/database');
const mockedValidateOrReject = validateOrReject as jest.MockedFunction<typeof validateOrReject>;
const mockedLeadCreate = (Lead.create as unknown) as jest.Mock;

describe('LeadResolver', () => {
  const resolver = new LeadResolver();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a lead', async () => {
    const input: RegisterLeadInput = {
      name: 'Test User',
      email: 'test@example.com',
      mobile: '1234567890',
      postcode: '2000',
      services: ['delivery'],
    };

    const mockLead = {
      ...input,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      save: jest.fn().mockResolvedValue(true),
    };

    mockedValidateOrReject.mockResolvedValue(undefined);
    mockedLeadCreate.mockReturnValue(mockLead);

    const result = await resolver.register(input);

    expect(validateOrReject).toHaveBeenCalledWith(input);
    expect(Lead.create).toHaveBeenCalledWith(input);
    expect(mockLead.save).toHaveBeenCalled();
    expect(result).toEqual(mockLead);
  });

  it('should fetch all leads', async () => {
    const mockLeads = [
      {
        id: 1,
        name: 'Lead 1',
        email: 'lead1@example.com',
        mobile: '1234567890',
        postcode: '2000',
        services: ['delivery'],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    __mockLeadRepository.find.mockResolvedValue(mockLeads);

    const result = await resolver.leads();

    expect(__mockLeadRepository.find).toHaveBeenCalledWith({
      order: { createdAt: 'DESC' },
    });
    expect(result).toEqual(mockLeads);
  });

  it('should fetch a single lead by ID', async () => {
    const mockLead = {
      id: 1,
      name: 'Lead 1',
      email: 'lead1@example.com',
      mobile: '1234567890',
      postcode: '2000',
      services: ['delivery'],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    __mockLeadRepository.findOneBy.mockResolvedValue(mockLead);

    const result = await resolver.lead(1);

    expect(__mockLeadRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(mockLead);
  });

  it('should throw validation error when input is invalid', async () => {
    const input: RegisterLeadInput = {
      name: '', // Invalid: empty name
      email: 'not-an-email', // Invalid: not a valid email
      mobile: 'invalid-phone', // Invalid format
      postcode: '', // Required field missing
      services: [], // Usually expected to have at least one service
    };

    const validationErrors: ValidationError[] = [
      {
        property: 'name',
        constraints: { isNotEmpty: 'name should not be empty' },
        children: [],
      },
      {
        property: 'email',
        constraints: { isEmail: 'email must be an email' },
        children: [],
      },
      {
        property: 'mobile',
        constraints: { matches: 'mobile must match /^[0-9]{10}$/' },
        children: [],
      },
    ];

    mockedValidateOrReject.mockRejectedValue(validationErrors);

    await expect(resolver.register(input)).rejects.toEqual(validationErrors);

    expect(validateOrReject).toHaveBeenCalledWith(input);
    expect(Lead.create).not.toHaveBeenCalled();
  });

  it('should not save if validation fails', async () => {
    const input: RegisterLeadInput = {
      name: '',
      email: '',
      mobile: '',
      postcode: '',
      services: [],
    };

    mockedValidateOrReject.mockRejectedValue([
      {
        property: 'name',
        constraints: { isNotEmpty: 'name should not be empty' },
        children: [],
      },
    ]);

    await expect(resolver.register(input)).rejects.toBeDefined();

    expect(Lead.create).not.toHaveBeenCalled();
    expect(__mockLeadRepository.save).not.toHaveBeenCalled();
  });
});
