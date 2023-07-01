/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {host , username ,password } from './env';


const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: host,
  port: 5432,
  username: username,
  password: password,
  database: 'challengedebts',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
