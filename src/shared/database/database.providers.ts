import { Sequelize } from 'sequelize-typescript';
import { User } from '../../user/models/user.model';
import { env } from '../utils/env';

export const databaseProviders = [
  // change this to .env
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        port: +env.port,
        host: env.host,
        database: env.database,
        username: env.username,
        dialect: 'postgres',
        password: env.password,
        logging: false,
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
