import knex from 'knex';
import { config } from '../../config';
import { logger } from '../../utils/logger';

const knexConfig = {
  client: 'postgresql',
  connection: {
    host: config.postgres.host,
    port: config.postgres.port,
    database: config.postgres.database,
    user: config.postgres.username,
    password: config.postgres.password,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: '../../migrations',
  },
  seeds: {
    directory: '../../seeds',
  },
};

export const db = knex(knexConfig);

export const connectPostgreSQL = async (): Promise<void> => {
  try {
    await db.raw('SELECT 1');
    logger.info('✅ PostgreSQL connected successfully');
  } catch (error) {
    logger.error('❌ PostgreSQL connection failed:', error);
    throw error;
  }
};

export const disconnectPostgreSQL = async (): Promise<void> => {
  try {
    await db.destroy();
    logger.info('✅ PostgreSQL disconnected successfully');
  } catch (error) {
    logger.error('❌ PostgreSQL disconnection failed:', error);
  }
}; 