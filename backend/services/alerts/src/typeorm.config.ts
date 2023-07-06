/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {host , username ,password,port } from './env';


const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_URL || host,

  port: port,
  username: process.env.DB_USERNAME || username,
  password: process.env.DB_PASSWORD || password,
  database: 'challengealerts',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
