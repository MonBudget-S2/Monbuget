/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const host = 'challenge-database';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: host,
  port: 5432,
  username: 'challengeuser',
  password: 'challengepass',
  database: 'challengebudgets',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
