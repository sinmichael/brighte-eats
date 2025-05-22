import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { config } from 'dotenv';
import { AppDataSource } from './utils/database';
import { LeadResolver } from './resolvers/LeadResolver';
import logger from './utils/logger';

config();

async function startServer() {
  try {
    await AppDataSource.initialize();
    logger.info('Database connected');

    const schema = await buildSchema({
      resolvers: [LeadResolver],
      validate: false,
    });

    const server = new ApolloServer({ schema, introspection: true });

    const { url } = await server.listen({ port: 4000 });
    logger.info(`Server is running at ${url}`);
    logger.info(`GraphQL Playground available at ${url}graphql`);
  } catch (err) {
    logger.error('Error starting server:', err);
  }
}

startServer();