import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/models/user.model';

export const databaseProviders = [
  // change this to .env
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        port: 5432,
        host:'localhost',
        database: 'simba',
        username: 'simba',
        dialect: 'postgres',
        password: 'vindiesel3',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
