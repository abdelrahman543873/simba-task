import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { AppModule } from '../src/app.module';

export let app: INestApplication;
let sequelizeProvider: Sequelize;

// Run before all tests
beforeAll(async () => {
  // Maximize test timeout
  jest.setTimeout(50000);
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();
  app = moduleRef.createNestApplication();
  sequelizeProvider = app.get('SEQUELIZE', { strict: false }) as Sequelize;
  await app.init();
});

// Run after all tests
afterAll(async () => {
  await sequelizeProvider.drop()
  await sequelizeProvider.close();
  await app.close();
});
