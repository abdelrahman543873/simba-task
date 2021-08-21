import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/models/user.model';

export const databaseProviders = [
  // change this to .env
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'vindesel3',
        database: 'simba',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
