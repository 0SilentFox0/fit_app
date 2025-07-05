import { ApolloServer } from 'apollo-server-express';
import { Express } from 'express';
import { buildSchema } from 'type-graphql';
import { logger } from '../utils/logger';

export const setupGraphQL = async (app: Express): Promise<void> => {
  try {
    // Build GraphQL schema
    const schema = await buildSchema({
      resolvers: [
        // Add resolvers here
      ] as any,
      validate: false,
    });

    // Create Apollo Server
    const server = new ApolloServer({
      schema,
      context: ({ req }) => ({
        req,
        user: (req as any).user, // Will be set by auth middleware
      }),
      formatError: (error) => {
        logger.error('GraphQL Error:', error);
        return error;
      },
      plugins: [
        {
          requestDidStart: async () => ({
            willSendResponse: async ({ response }) => {
              logger.info('GraphQL Response:', {
                data: response.data,
                errors: response.errors,
              });
            },
          }),
        },
      ],
    });

    await server.start();
    server.applyMiddleware({ app: app as any, path: '/graphql' });

    logger.info('✅ GraphQL server started at /graphql');
  } catch (error) {
    logger.error('❌ GraphQL setup failed:', error);
    throw error;
  }
}; 