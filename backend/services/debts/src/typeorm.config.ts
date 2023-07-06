/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {host , username ,password } from './env';


const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_URL || host,

  port: 5432,
  username: process.env.DB_USERNAME || username,
  password: process.env.DB_PASSWORD || password,
  database: 'challengedebts',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
